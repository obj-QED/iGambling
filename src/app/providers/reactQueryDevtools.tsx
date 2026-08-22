import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export default function ReactQueryDevtoolsLazy() {
  return <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />;
}
