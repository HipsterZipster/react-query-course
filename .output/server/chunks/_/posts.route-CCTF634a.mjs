import { jsxs, jsx } from 'react/jsx-runtime';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Link, Outlet } from '@tanstack/react-router';
import { p as postsQueryOptions } from './ssr.mjs';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'redaxios';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const SplitComponent = function PostsComponent() {
  const postsQuery = useSuspenseQuery(postsQueryOptions());
  return /* @__PURE__ */ jsxs("div", { className: "p-2 flex gap-2", children: [
    /* @__PURE__ */ jsx("ul", { className: "list-disc pl-4", children: [...postsQuery.data, {
      id: "i-do-not-exist",
      title: "Non-existent Post"
    }].map((post) => {
      return /* @__PURE__ */ jsx("li", { className: "whitespace-nowrap", children: /* @__PURE__ */ jsx(Link, { to: "/posts/$postId", params: {
        postId: post.id
      }, className: "block py-1 text-blue-800 hover:text-blue-600", activeProps: {
        className: "text-black font-bold"
      }, children: /* @__PURE__ */ jsx("div", { children: post.title.substring(0, 20) }) }) }, post.id);
    }) }),
    /* @__PURE__ */ jsx("hr", {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=posts.route-CCTF634a.mjs.map
