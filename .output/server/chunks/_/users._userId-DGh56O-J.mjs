import { jsxs, jsx } from 'react/jsx-runtime';
import { useSuspenseQuery } from '@tanstack/react-query';
import { R as Route$b, a as userQueryOptions } from './ssr.mjs';
import '@tanstack/react-router';
import '@tanstack/react-router-with-query';
import '@tanstack/react-query-devtools';
import '@tanstack/react-router-devtools';
import 'redaxios';
import 'node:async_hooks';
import '@tanstack/react-router/ssr/server';

const SplitComponent = function UserComponent() {
  const params = Route$b.useParams();
  const userQuery = useSuspenseQuery(userQueryOptions(params.userId));
  const user = userQuery.data;
  return /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsx("h4", { className: "text-xl font-bold underline", children: user.name }),
    /* @__PURE__ */ jsx("div", { className: "text-sm", children: user.email })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=users._userId-DGh56O-J.mjs.map
