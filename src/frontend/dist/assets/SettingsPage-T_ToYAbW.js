import { r as reactExports, j as jsxRuntimeExports, c as cn, a as useNavigate } from "./index-Cs24hTMk.js";
import { X, m as Primitive, u as useAuth, n as useAccessibility, A as AppLayout, o as Type, L as Label, j as Switch } from "./AppLayout-4ZKxUA7p.js";
import { c as createLucideIcon } from "./createLucideIcon-nnWebpkL.js";
import { B as Bell, S as SubscriptionCard } from "./SubscriptionCard-Bho1kuCC.js";
import { m as motion } from "./proxy-3RPPOCwZ.js";
import { S as Shield } from "./shield-CZXb-rDq.js";
import { C as ChevronRight } from "./chevron-right-CNApGgaa.js";
import "./circle-check-big-BQXcWwZR.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$5 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$5);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
];
const ExternalLink = createLucideIcon("external-link", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20", key: "13o1zl" }],
  ["path", { d: "M2 12h20", key: "9i4pu4" }]
];
const Globe = createLucideIcon("globe", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "14sxne" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }],
  ["path", { d: "M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16", key: "1hlbsb" }],
  ["path", { d: "M16 16h5v5", key: "ccwih5" }]
];
const RefreshCcw = createLucideIcon("refresh-ccw", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }]
];
const Smartphone = createLucideIcon("smartphone", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function getInitials(name) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}
function FamilyModeCard({
  members,
  onAddMember,
  onRemoveMember,
  className
}) {
  const [removingIdx, setRemovingIdx] = reactExports.useState(null);
  const visible = members.slice(0, 5);
  function handleRemove(idx) {
    setRemovingIdx(idx);
    setTimeout(() => {
      onRemoveMember == null ? void 0 : onRemoveMember(idx);
      setRemovingIdx(null);
    }, 200);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-2xl border-2 border-primary/20 bg-primary/5 p-5 space-y-4",
        className
      ),
      "data-ocid": "family_mode.card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-bold text-base text-foreground flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "👨‍👩‍👧" }),
            " Mode Famille"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: "Un proche peut gérer vos réservations à votre place" })
        ] }),
        visible.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-wrap gap-2", "aria-label": "Membres de la famille", children: visible.map((member, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "li",
          {
            "data-ocid": `family_mode.member.${idx + 1}`,
            className: cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border transition-all duration-200",
              removingIdx === idx ? "opacity-0 scale-90" : "opacity-100 scale-100"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary-foreground text-[10px] font-bold", children: getInitials(member.name) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: member.name }),
              onRemoveMember && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `family_mode.remove_member.${idx + 1}`,
                  onClick: () => handleRemove(idx),
                  className: "w-5 h-5 rounded-full hover:bg-destructive/20 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-destructive",
                  "aria-label": `Retirer ${member.name}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    X,
                    {
                      className: "w-3 h-3 text-muted-foreground",
                      "aria-hidden": "true"
                    }
                  )
                }
              )
            ]
          },
          `member-${member.phone}-${idx}`
        )) }),
        visible.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-sm text-muted-foreground italic",
            "data-ocid": "family_mode.empty_state",
            children: "Aucun proche ajouté pour le moment"
          }
        ),
        members.length < 5 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            "data-ocid": "family_mode.add_button",
            onClick: onAddMember,
            className: cn(
              "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 border-dashed border-primary/40",
              "text-primary text-sm font-semibold hover:bg-primary/10 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[44px]"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4", "aria-hidden": "true" }),
              "Ajouter un proche +"
            ]
          }
        )
      ]
    }
  );
}
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
const INITIAL_MEMBERS = [
  { name: "Ahmed Bouzid", phone: "+216 25 123 456", relation: "Fils" }
];
function SectionTitle({
  id,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { id, className: "font-semibold text-foreground text-sm mb-2 px-1", children });
}
function SettingRow({
  icon,
  title,
  description,
  ocid,
  rightElement,
  onClick,
  disabled
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      "data-ocid": ocid,
      onClick,
      disabled,
      className: cn(
        "w-full flex items-center gap-3 py-3 px-2 text-left rounded-xl transition-colors min-h-[56px]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        disabled ? "opacity-50 cursor-not-allowed" : "hover:bg-muted/50"
      ),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl bg-foreground/8 flex items-center justify-center flex-shrink-0 text-foreground/70", children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: title }),
          description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: description })
        ] }),
        rightElement ?? /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronRight,
          {
            className: "w-4 h-4 text-muted-foreground flex-shrink-0",
            "aria-hidden": "true"
          }
        )
      ]
    }
  );
}
function SettingsPage() {
  const [activeTab, setActiveTab] = reactExports.useState("profile");
  const [pushNotif, setPushNotif] = reactExports.useState(true);
  const [emailNotif, setEmailNotif] = reactExports.useState(false);
  const [familyMembers, setFamilyMembers] = reactExports.useState(INITIAL_MEMBERS);
  const { userRole } = useAuth();
  const { textSize, highContrast, setTextSize, toggleHighContrast } = useAccessibility();
  const navigate = useNavigate();
  const isPmr = (userRole ?? "pmr") === "pmr";
  function handleTabChange(key, route) {
    setActiveTab(key);
    navigate({ to: route });
  }
  function handleRemoveMember(idx) {
    setFamilyMembers((prev) => prev.filter((_, i) => i !== idx));
  }
  function handleAddMember() {
    const newMember = {
      name: `Proche ${familyMembers.length + 1}`,
      phone: "+216 XX XXX XXX",
      relation: "Proche"
    };
    setFamilyMembers((prev) => [...prev, newMember]);
  }
  function handleReset() {
    setTextSize("medium");
    if (highContrast) toggleHighContrast();
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    AppLayout,
    {
      activeTab,
      onTabChange: handleTabChange,
      title: "Paramètres",
      userRole: userRole ?? "pmr",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-4 space-y-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            "aria-labelledby": "access-heading",
            className: "rounded-2xl border-2 border-primary/30 bg-primary/5 p-4 space-y-4",
            "data-ocid": "settings.accessibility.card",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "h3",
                    {
                      id: "access-heading",
                      className: "font-bold text-foreground text-base flex items-center gap-2",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "♿" }),
                        " Accessibilité"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Pour une meilleure lisibilité" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "settings.accessibility.reset_button",
                    onClick: handleReset,
                    className: "flex items-center gap-1.5 text-xs text-muted-foreground font-medium hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1 min-h-[44px]",
                    "aria-label": "Réinitialiser les paramètres d'accessibilité",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCcw, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                      "Réinitialiser"
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Type, { className: "w-4 h-4 text-primary", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-sm font-semibold text-foreground", children: "Taille du texte" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "grid grid-cols-3 gap-2 border-0 p-0 m-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Sélectionnez la taille du texte" }),
                  [
                    { key: "small", label: "S" },
                    { key: "medium", label: "M" },
                    { key: "large", label: "L" }
                  ].map(({ key, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      "data-ocid": `settings.text_size_${key}.button`,
                      onClick: () => setTextSize(key),
                      "aria-pressed": textSize === key,
                      className: cn(
                        "py-3 rounded-xl border text-sm font-bold transition-all min-h-[44px]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                        textSize === key ? "bg-primary text-primary-foreground border-primary shadow-sm" : "bg-card border-border text-foreground hover:bg-muted"
                      ),
                      children: label
                    },
                    key
                  ))
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: "high-contrast-toggle",
                      className: "text-sm font-semibold text-foreground",
                      children: "Mode contraste élevé"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Pour une meilleure lisibilité" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Switch,
                  {
                    id: "high-contrast-toggle",
                    "data-ocid": "settings.high_contrast.switch",
                    checked: highContrast,
                    onCheckedChange: toggleHighContrast,
                    "aria-label": "Activer le contraste élevé"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.06 },
            "aria-labelledby": "notif-heading",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { id: "notif-heading", children: "Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border px-2 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "w-4 h-4", "aria-hidden": "true" }),
                    title: "Notifications push",
                    description: "Alertes réservations et mises à jour",
                    ocid: "settings.push_notifications.row",
                    rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        "data-ocid": "settings.push_notifications.switch",
                        checked: pushNotif,
                        onCheckedChange: setPushNotif,
                        "aria-label": "Notifications push"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mx-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "w-4 h-4", "aria-hidden": "true" }),
                    title: "Notifications email",
                    description: "Confirmations et rappels par email",
                    ocid: "settings.email_notifications.row",
                    rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Switch,
                      {
                        "data-ocid": "settings.email_notifications.switch",
                        checked: emailNotif,
                        onCheckedChange: setEmailNotif,
                        "aria-label": "Notifications email"
                      }
                    )
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.08 },
            "aria-labelledby": "lang-heading",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { id: "lang-heading", children: "Langue" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-card border border-border px-2 py-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SettingRow,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4", "aria-hidden": "true" }),
                  title: "Langue de l'application",
                  description: "Français (v1)",
                  ocid: "settings.language.row",
                  disabled: true,
                  rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full", children: "Français" })
                }
              ) })
            ]
          }
        ),
        isPmr && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.1 },
            "aria-labelledby": "family-heading",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { id: "family-heading", children: "Mode Famille" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FamilyModeCard,
                {
                  members: familyMembers,
                  onAddMember: handleAddMember,
                  onRemoveMember: handleRemoveMember
                }
              )
            ]
          }
        ),
        isPmr && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.12 },
            "aria-labelledby": "sub-heading",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { id: "sub-heading", children: "Abonnement" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SubscriptionCard,
                {
                  isPremium: false,
                  onSubscribe: () => {
                  },
                  onManage: () => {
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 12 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.14 },
            "aria-labelledby": "about-heading",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SectionTitle, { id: "about-heading", children: "À propos" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl bg-card border border-border px-2 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4", "aria-hidden": "true" }),
                    title: "Politique de confidentialité",
                    ocid: "settings.privacy_policy.link",
                    rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ExternalLink,
                      {
                        className: "w-4 h-4 text-muted-foreground",
                        "aria-hidden": "true"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mx-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ExternalLink, { className: "w-4 h-4", "aria-hidden": "true" }),
                    title: "Conditions générales (CGU)",
                    ocid: "settings.cgu.link",
                    rightElement: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ExternalLink,
                      {
                        className: "w-4 h-4 text-muted-foreground",
                        "aria-hidden": "true"
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "mx-2" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SettingRow,
                  {
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "w-4 h-4", "aria-hidden": "true" }),
                    title: "Contacter le support",
                    description: "Signaler un problème ou obtenir de l'aide",
                    ocid: "settings.support.link"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 0.16 },
            className: "text-center py-4 space-y-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: "Wejha وجهة" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Version 1.0.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                ". Built with love using",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "a",
                  {
                    href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "text-primary hover:underline",
                    children: "caffeine.ai"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4" })
      ] })
    }
  );
}
export {
  SettingsPage as default
};
