import { jsxs, jsx } from 'react/jsx-runtime';
import { useSuspenseQuery, queryOptions } from '@tanstack/react-query';
import { useState, Suspense } from 'react';

const deferredQueryOptions = () => queryOptions({
  queryKey: ["deferred"],
  queryFn: async () => {
    await new Promise((r) => setTimeout(r, 3e3));
    return {
      message: `Hello deferred from the server!`,
      status: "success",
      time: /* @__PURE__ */ new Date()
    };
  }
});
function DeferredQuery() {
  const deferredQuery = useSuspenseQuery(deferredQueryOptions());
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { children: "Deferred Query" }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Status: ",
      deferredQuery.data.status
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Message: ",
      deferredQuery.data.message
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Time: ",
      deferredQuery.data.time.toISOString()
    ] })
  ] });
}
const SplitComponent = function Deferred() {
  const [count, setCount] = useState(0);
  return /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
    /* @__PURE__ */ jsx(Suspense, { fallback: "Loading Middleman...", children: /* @__PURE__ */ jsx(DeferredQuery, {}) }),
    /* @__PURE__ */ jsxs("div", { children: [
      "Count: ",
      count
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx("button", { onClick: () => setCount(count + 1), children: "Increment" }) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=deferred-CdxJuQ03.mjs.map
