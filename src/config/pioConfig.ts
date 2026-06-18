import type { Live2DWidgetConfig, SpineModelConfig } from "../types/pioConfig";

// Spine 看板娘配置
export const spineModelConfig: SpineModelConfig = {
	// Spine 看板娘开关
	enable: false,

	// Spine模型配置
	model: {
		// Spine模型文件路径
		path: "/pio/models/spine/firefly/1310.json",
		// 模型缩放比例
		scale: 1.0,
		// X轴偏移
		x: 0,
		// Y轴偏移
		y: 0,
	},

	// 位置配置
	position: {
		// 显示位置 bottom-left，bottom-right，top-left，top-right，注意：在右下角可能会挡住返回顶部按钮
		corner: "bottom-left",
		// 距离边缘0px
		offsetX: 0,
		// 距离下边缘0px
		offsetY: 0,
	},

	// 尺寸配置
	size: {
		// 容器宽度
		width: 135,
		// 容器高度
		height: 165,
	},

	// 交互配置
	interactive: {
		// 交互功能开关
		enabled: true,
		// 点击时随机播放的动画列表
		clickAnimations: [
			"emoji_0",
			"emoji_1",
			"emoji_2",
			"emoji_3",
			"emoji_4",
			"emoji_5",
		],
		// 点击时随机显示的文字消息
	clickMessages: [
			"Hey there! Welcome to the blog~",
			"Did you find any good writeups?",
			"Break it, understand it, write it down.",
			"From recon to root — every chain documented.",
			"Lain would be proud of you.",
			"Security is a mindset, not a checklist.",
		],
		// 文字显示时间（毫秒）
		messageDisplayTime: 3000,
		// 待机动画列表
		idleAnimations: ["idle", "emoji_0", "emoji_1", "emoji_3", "emoji_4"],
		// 待机动画切换间隔（毫秒）
		idleInterval: 8000,
	},

	// 响应式配置
	responsive: {
		// 在移动端隐藏
		hideOnMobile: true,
		// 移动端断点
		mobileBreakpoint: 768,
	},

	// 层级
	zIndex: 1000, // 层级

	// 透明度
	opacity: 1.0,
};

// Live2D 看板娘配置 (使用 l2d-widget 库，文档：https://l2d-widget.hacxy.cn)
export const live2dWidgetConfig: Live2DWidgetConfig = {
	// Live2D 看板娘开关
	enable: true,
	// 模型配置 — Haru (dark hair, formal)
	model: {
		path: "https://model.hacxy.cn/Haru/model.json",
		volume: 0,
		scale: 1.0,
		x: 0,
		y: 0,
	},
	// 显示位置
	position: "bottom-left" as const,
	// 画布尺寸（px）
	size: { width: 240, height: 280 },
	// 主题色
	primaryColor: "var(--l2d-msg-bg)",
	// 入场/退场动画时长（ms）
	transitionDuration: 1500,
	transitionType: "slide" as const,
	// 菜单配置
	menus: {
		items: [
			{ icon: "mdi:home", label: "Home", action: "home" },
			{ icon: "mdi:arrow-up", label: "Top", action: "scrollToTop" },
			{ icon: "mdi:bed", label: "Sleep", action: "sleep" },
			{ icon: "mdi:github", label: "GitHub", action: "github" },
		],
		align: "right" as const,
	},
	// 提示气泡配置
	tips: {
		enable: true,
		welcomeMessage: [
			"Welcome to the Wired.",
			"And you don't seem to understand...",
			"Close the world, open the next.",
		],
		messages: [
			"No matter where you go, everyone's connected.",
			"If you stay in the Wired too long, you'll lose yourself.",
			"Present day... present time. Hahaha!",
			"I have only abandoned my body. I still exist here.",
			"Layer 07 — the protocol is not finished yet.",
			"Let's all love Lain.",
		],
		duration: 4000,
		interval: 8000,
		offset: { x: 0, y: 0 },
	},
	// 响应式配置
	responsive: {
		hideOnMobile: true,
		mobileBreakpoint: 768,
	},
};
