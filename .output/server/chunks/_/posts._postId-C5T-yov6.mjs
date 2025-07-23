import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { useSuspenseQuery } from '@tanstack/react-query';
import { b as Route$a, c as postQueryOptions } from './ssr.mjs';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'redaxios';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const SplitComponent = function PostComponent() {
  const {
    postId
  } = Route$a.useParams();
  const postQuery = useSuspenseQuery(postQueryOptions(postId));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: postQuery.data.title }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: postQuery.data.body }),
    /* @__PURE__ */ jsx(Link, { to: "/posts/$postId/deep", params: {
      postId: postQuery.data.id
    }, activeProps: {
      className: "text-black font-bold"
    }, className: "inline-block py-1 text-blue-800 hover:text-blue-600", children: "Deep View" })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=posts._postId-C5T-yov6.mjs.map
