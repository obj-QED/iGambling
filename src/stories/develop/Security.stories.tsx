import type { Meta, StoryObj } from '@storybook/react-vite';

import { Text } from '@mantine/core';

import {
  DevelopBulletList,
  DevelopCode,
  DevelopDocPage,
  DevelopKvTable,
} from './ui/DevelopDocPage';

const meta = {
  title: 'Develop/Security',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: { disable: true },
    docs: {
      description: {
        component:
          'Threat model for external AI security review: what the SPA enforces vs what the PHP backend must own.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const THREAT_ROWS: readonly [string, string][] = [
  [
    'Credential stuffing',
    'Backend: rate limit / CAPTCHA / lockout. SPA: no credential storage; login page is a shell only.',
  ],
  [
    'Bot / lobby token in session',
    'Forbidden in sessionStorage. Lobby token = in-memory only. Bot tokens never in SPA. Auth = httpOnly cookie.',
  ],
  [
    'Hide token in Network',
    'Impossible for body/query secrets. Use httpOnly cookie + withCredentials. Body token is legacy PHP bridge.',
  ],
  [
    'IDOR',
    'Backend must authorize resource ownership. SPA never treats client IDs as proof of access.',
  ],
  [
    'User text → DB / admin / fake webhook',
    'SPA allowlists lobby cmd (initV2|getPage|translation). Backend must reject everything else + use prepared statements.',
  ],
  [
    'Session theft',
    'No tokens in localStorage/Redux. Sanitize HTML. Backend: httpOnly + Secure + SameSite + CSP.',
  ],
  [
    'Vulnerable deps / malware',
    'CI yarn audit:deps (high/critical on direct prod deps). SSRF: assertSafeRequestUrl blocks foreign absolute URLs.',
  ],
  [
    'Malicious files',
    'No client-side execute of uploads. Backend: MIME/size/AV. SPA only displays trusted CDN/upload paths.',
  ],
  [
    'Cross-site authenticated requests',
    'Same-origin relative lobby API + withCredentials. Backend must verify Origin/Referer and SameSite cookies.',
  ],
];

export const Overview: Story = {
  render: () => (
    <DevelopDocPage
      title="Security threat model"
      subtitle="Public brief for security / AI agents. Frontend is defense-in-depth — PHP backend remains the enforcement plane."
      badges={['httpOnly', 'cmd allowlist', 'yarn audit:deps', 'SSRF guard']}
      sections={[
        {
          id: 'map',
          title: 'Threat → control',
          body: <DevelopKvTable rows={THREAT_ROWS} columns={['Threat', 'Control']} />,
        },
        {
          id: 'spa',
          title: 'SPA enforcement points',
          body: (
            <DevelopBulletList
              items={[
                'src/api/baseApi — withCredentials, XSRF cookie names, same-origin URL guard, secret redaction on errors',
                'src/api/security/lobbyCommands — assertLobbyCommand allowlist',
                'src/api/lobby/lobbySession — memory only; never sessionStorage',
                'Query keys — sessionRevision, never raw token',
                'CI — yarn audit:deps',
              ]}
            />
          ),
        },
        {
          id: 'network',
          title: 'About “hiding” tokens in DevTools',
          body: (
            <>
              <Text size="sm" mb="sm">
                Browsers always show request payloads to the user. Obfuscation is not security. The
                correct model:
              </Text>
              <DevelopCode>{`1. Backend Set-Cookie: session=…; HttpOnly; Secure; SameSite=Lax|Strict
2. SPA axios withCredentials: true (already)
3. Stop returning lobby token in JSON and stop requiring body.token
4. Until backend migrates: body.token remains visible — treat as transitional`}</DevelopCode>
            </>
          ),
        },
        {
          id: 'backend',
          title: 'Backend must still do',
          body: (
            <DevelopBulletList
              items={[
                'Rate-limit auth + init endpoints (credential stuffing)',
                'IDOR checks on every resource id',
                'Cmd allowlist identical to SPA + reject SQL/admin/webhook payloads',
                'Webhook HMAC verification; never trust client-forged webhook bodies',
                'Upload malware scan; never serve user files as executable',
                'CORS deny credentialed cross-origin; verify Origin on state-changing requests',
              ]}
            />
          ),
        },
      ]}
    />
  ),
};
