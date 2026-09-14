import type { ReactNode } from 'react';

import { useSyncExternalStore } from 'react';

import { InvalidResponsePage } from '@pages/eager';

import { getInvalidResponse, subscribeInvalidResponse } from '@api/baseApi';

type InvalidResponseGateProps = {
  children: ReactNode;
};

function InvalidResponseGateComponent({ children }: InvalidResponseGateProps) {
  const error = useSyncExternalStore(
    subscribeInvalidResponse,
    getInvalidResponse,
    getInvalidResponse,
  );

  if (error !== null) {
    return (
      <InvalidResponsePage status={error.status} message={error.message} snippet={error.snippet} />
    );
  }

  return children;
}

InvalidResponseGateComponent.displayName = 'InvalidResponseGate';

export const InvalidResponseGate = InvalidResponseGateComponent;
