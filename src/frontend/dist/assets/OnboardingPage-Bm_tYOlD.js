import { j as jsxRuntimeExports, c as cn, r as reactExports, u as useAuthStore, a as useNavigate } from "./index-Cs24hTMk.js";
import { C as CircleCheckBig } from "./circle-check-big-BQXcWwZR.js";
import { W as WejhaButton } from "./WejhaButton-B0Qu1nSF.js";
import { M as MotionConfigContext, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from "./proxy-3RPPOCwZ.js";
import { c as createLucideIcon } from "./createLucideIcon-nnWebpkL.js";
import { C as ChevronRight } from "./chevron-right-CNApGgaa.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode);
const roles = [
  {
    role: "pmr",
    icon: "♿",
    label: "Je suis une personne à mobilité réduite (PMR)",
    sublabel: "Accédez à des services d'aide et de transport adaptés"
  },
  {
    role: "student",
    icon: "🎓",
    label: "Je suis étudiant prestataire",
    sublabel: "Aidez des personnes PMR et gagnez des points + revenus"
  },
  {
    role: "driver",
    icon: "🚗",
    label: "Je suis chauffeur avec label PMR",
    sublabel: "Effectuez des courses adaptées avec votre véhicule équipé"
  }
];
function RoleSelector({
  selectedRole,
  onSelectRole
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3 w-full", children: roles.map(({ role, icon, label, sublabel }) => {
    const isSelected = selectedRole === role;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "label",
      {
        htmlFor: `role-${role}`,
        className: cn(
          "w-full min-h-[80px] flex items-center gap-4 px-5 py-4 rounded-2xl border-2 text-left cursor-pointer",
          "transition-all duration-200",
          isSelected ? "border-primary bg-primary/10 shadow-md scale-[1.01]" : "border-border bg-card hover:border-primary/40 hover:bg-primary/5"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: `role-${role}`,
              type: "radio",
              name: "wejha-role",
              value: role,
              checked: isSelected,
              onChange: () => onSelectRole(role),
              "data-ocid": `onboarding.role_${role}.card`,
              className: "sr-only focus-visible:ring-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl flex-shrink-0", "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "p",
              {
                className: cn(
                  "font-semibold text-sm leading-snug",
                  isSelected ? "text-primary" : "text-foreground"
                ),
                children: label
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: sublabel })
          ] }),
          isSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleCheckBig,
            {
              className: "w-5 h-5 text-primary flex-shrink-0",
              "aria-hidden": "true"
            }
          )
        ]
      },
      role
    );
  }) });
}
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const TOTAL_SLIDES = 3;
function Slide1() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center text-center gap-6 px-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-28 h-28 rounded-full gradient-primary flex items-center justify-center shadow-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground font-display font-black text-5xl", children: "W" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-2 text-xl font-bold text-foreground", dir: "rtl", children: "وجهة" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-20 h-20 rounded-full flex items-center justify-center shadow-lg",
        style: {
          background: "linear-gradient(135deg, oklch(0.65 0.18 210), oklch(0.72 0.18 190))"
        },
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl", children: "♿" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-black text-3xl text-foreground leading-tight", children: "Bienvenue sur Wejha" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg text-primary italic", children: "Ensemble, sans frontières" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "La plateforme tunisienne qui connecte les personnes à mobilité réduite avec des prestataires de confiance." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs space-y-2", children: [
      { icon: "🛡️", text: "Prestataires vérifiés et certifiés" },
      { icon: "⭐", text: "Système de notation transparent" },
      { icon: "🎮", text: "Gamification et récompenses" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-3 rounded-xl bg-card border border-border",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", "aria-hidden": "true", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: item.text })
        ]
      },
      item.text
    )) })
  ] });
}
function Slide2() {
  const roleCards = [
    { icon: "♿", title: "PMR", desc: "Accédez à des services adaptés" },
    { icon: "🎓", title: "Étudiant", desc: "Aidez et gagnez des points" },
    { icon: "🚗", title: "Chauffeur", desc: "Transport PMR certifié" }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-6 px-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-3xl text-foreground", children: "Pour tout le monde" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Une solution inclusive pour toute la communauté tunisienne" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 w-full", children: roleCards.map((card, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.12 },
        className: "flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border shadow-sm",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl", "aria-hidden": "true", children: card.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-sm text-foreground", children: card.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-tight", children: card.desc })
        ]
      },
      card.title
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full space-y-3", children: [
      { icon: "🔐", text: "Vérification des profils et documents" },
      { icon: "💳", text: "Abonnement Premium disponible" },
      { icon: "👨‍👩‍👧", text: "Mode Famille pour vos proches" }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-3 p-3 rounded-xl bg-muted/40",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl flex-shrink-0", "aria-hidden": "true", children: item.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground font-medium", children: item.text })
        ]
      },
      item.text
    )) })
  ] });
}
function Slide3({ selectedRole, onSelectRole }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 px-6 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-2xl text-foreground", children: "Commencez maintenant" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Qui êtes-vous ?" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(RoleSelector, { selectedRole, onSelectRole })
  ] });
}
function OnboardingPage() {
  const [slide, setSlide] = reactExports.useState(0);
  const [selectedRole, setSelectedRole] = reactExports.useState(null);
  const [touchStart, setTouchStart] = reactExports.useState(null);
  const { setAuth, setRole } = useAuthStore();
  const navigate = useNavigate();
  function goNext() {
    if (slide < TOTAL_SLIDES - 1) setSlide((s) => s + 1);
  }
  function goPrev() {
    if (slide > 0) setSlide((s) => s - 1);
  }
  function handleContinue() {
    if (slide < TOTAL_SLIDES - 1) {
      goNext();
      return;
    }
    if (!selectedRole) return;
    setAuth(`user-${Date.now()}`, selectedRole);
    setRole(selectedRole);
    if (selectedRole === "student") navigate({ to: "/student/dashboard" });
    else if (selectedRole === "driver") navigate({ to: "/driver/dashboard" });
    else navigate({ to: "/home" });
  }
  function handleTouchStart(e) {
    setTouchStart(e.touches[0].clientX);
  }
  function handleTouchEnd(e) {
    if (touchStart === null) return;
    const delta = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0 && slide < TOTAL_SLIDES - 1) goNext();
      else if (delta < 0 && slide > 0) goPrev();
    }
    setTouchStart(null);
  }
  const canContinue = slide < TOTAL_SLIDES - 1 || selectedRole !== null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col min-h-screen bg-background",
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end px-4 pt-4 min-h-[48px] items-center", children: slide < TOTAL_SLIDES - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "onboarding.skip_button",
            onClick: () => setSlide(TOTAL_SLIDES - 1),
            className: "min-h-[44px] px-4 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl",
            children: "Passer →"
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: slide === 0 ? 0 : 30 },
            animate: { opacity: 1, x: 0 },
            exit: { opacity: 0, x: -30 },
            transition: { duration: 0.25 },
            className: "w-full h-full overflow-y-auto",
            "aria-live": "polite",
            children: [
              slide === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Slide1, {}),
              slide === 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(Slide2, {}),
              slide === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Slide3,
                {
                  selectedRole,
                  onSelectRole: setSelectedRole
                }
              )
            ]
          },
          slide
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 pb-8 pt-4 space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2", children: ["slide-1", "slide-2", "slide-3"].map((id, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `onboarding.dot.${i + 1}`,
              onClick: () => setSlide(i),
              className: `h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${slide === i ? "w-6 bg-primary" : "w-2 bg-border"}`,
              "aria-label": `Aller à l'étape ${i + 1}`,
              "aria-current": slide === i ? "step" : void 0
            },
            id
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            slide > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "onboarding.prev_button",
                onClick: goPrev,
                className: "w-12 h-14 rounded-2xl border border-border bg-card flex items-center justify-center hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary flex-shrink-0",
                "aria-label": "Retour",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronLeft,
                  {
                    className: "w-5 h-5 text-foreground",
                    "aria-hidden": "true"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              WejhaButton,
              {
                variant: "primary",
                size: "lg",
                fullWidth: true,
                "data-ocid": "onboarding.continue_button",
                onClick: handleContinue,
                disabled: !canContinue,
                children: slide < TOTAL_SLIDES - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  "Continuer",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5", "aria-hidden": "true" })
                ] }) : "C'est parti ! →"
              }
            )
          ] })
        ] })
      ]
    }
  );
}
export {
  OnboardingPage as default
};
