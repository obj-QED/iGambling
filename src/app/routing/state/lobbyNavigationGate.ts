/**
 * Router creation happens before React bootstrap settles. Keep its initial
 * loader pass network-silent: the first route is rendered exclusively from
 * translation → init. The gate opens once that payload is ready; only then
 * may a user-driven navigation request `getPage`.
 */
let ready = false;

export function isLobbyNavigationReady(): boolean {
  return ready;
}

export function setLobbyNavigationReady(): void {
  ready = true;
}

/** Test helper. */
export function resetLobbyNavigationGateForTests(): void {
  ready = false;
}
