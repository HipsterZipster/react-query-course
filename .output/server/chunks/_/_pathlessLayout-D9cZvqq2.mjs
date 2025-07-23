import { jsxs, jsx } from 'react/jsx-runtime';
import { Outlet } from '@tanstack/react-router';

const SplitComponent = function PathlessLayoutComponent() {
  return /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
    /* @__PURE__ */ jsx("div", { children: "I'm a pathless layout" }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Outlet, {}) })
  ] });
};

export { SplitComponent as component };
//# sourceMappingURL=_pathlessLayout-D9cZvqq2.mjs.map
