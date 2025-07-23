import { jsx } from 'react/jsx-runtime';
import { N as NotFound } from './ssr.mjs';
import '@tanstack/react-query';
import '@tanstack/react-router';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'redaxios';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const SplitNotFoundComponent = () => {
  return /* @__PURE__ */ jsx(NotFound, { children: "Post not found" });
};

export { SplitNotFoundComponent as notFoundComponent };
//# sourceMappingURL=posts._postId-DX7OagJj.mjs.map
