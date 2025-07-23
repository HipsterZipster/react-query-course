import { jsxs, jsx } from 'react/jsx-runtime';
import { Link, Outlet } from '@tanstack/react-router';

const SplitComponent = function PathlessLayoutComponent() {
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { children: "I'm a nested pathless layout" }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsx(Link, { to: "/route-a", activeProps: {
        className: "font-bold"
      }, children: "Go to route A" }),
      /* @__PURE__ */ jsx(Link, { to: "/route-b", activeProps: {
        className: "font-bold"
      }, children: "Go to route B" })
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=_nested-layout-BfZSVE8c.mjs.map
