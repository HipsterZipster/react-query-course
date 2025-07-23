import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { d as Route$2, c as postQueryOptions } from './ssr.mjs';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'redaxios';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const SplitComponent = function PostDeepComponent() {
  const {
    postId
  } = Route$2.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  return /* @__PURE__ */ jsxs("div", { className: "p-2 space-y-2", children: [
    /* @__PURE__ */ jsx(Link, { to: "/posts", className: "block py-1 text-blue-800 hover:text-blue-600", children: "\u2190 All Posts" }),
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: postQuery.data.title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: postQuery.data.body })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=posts_._postId.deep-U3OHZajD.mjs.map
