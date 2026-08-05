# Taste + GSAP Frontend

一个把 Taste Skill 的前端审美决策与 GSAP 动效工程实践融合在一起的 Codex skill。

它适用于 landing page、portfolio、品牌官网和现有页面 redesign，支持 React、Next.js、Vue、Svelte 以及 vanilla frontend。

## 能做什么

- 读取页面 brief，确定页面类型、受众、视觉语言和设计系统
- 避免模板化布局、无意义渐变和无目的动效
- 用 `MOTION_INTENSITY` 控制动效强度
- 识别并实现 GSAP tween、timeline、stagger、ScrollTrigger、pin、scrub、parallax 等效果
- 选择和使用 Flip、Draggable、Observer、SplitText、MotionPath 等插件
- 处理 React/framework 生命周期、响应式断点、性能和 reduced motion
- 在普通 reveal 场景下优先选择 CSS 或 Motion，在复杂编排场景下使用 GSAP

## 安装

将这个目录安装到 Codex skills 目录：

```text
~/.codex/skills/taste-gsap-frontend
```

Windows 默认位置：

```text
C:\Users\CX\.codex\skills\taste-gsap-frontend
```

## 使用

直接调用：

```text
使用 $taste-gsap-frontend 完成这个前端页面。
```

如果关闭动效：

```text
使用 $taste-gsap-frontend，设置 MOTION_INTENSITY: 1，不使用 Motion 或 GSAP。
```

如果需要复杂滚动动效：

```text
使用 $taste-gsap-frontend，设计页面并用 GSAP 实现 sticky stack、ScrollTrigger scrub 和横向滚动。
```

## 目录

```text
SKILL.md
agents/openai.yaml
references/
├─ gsap-catalog.md
├─ gsap-patterns.md
├─ gsap-selection.md
└─ taste-variants.md
```

## 设计原则

Taste 决定“页面为什么这样设计、哪里应该动”；GSAP 决定“动效如何可靠实现”。每个动效都必须服务于层级、叙事、反馈或状态变化，不能只是为了炫技。

所有复杂动效都应支持移动端、键盘交互、`prefers-reduced-motion` 和组件卸载清理。

## License

MIT
