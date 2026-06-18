import type { ProfileConfig } from "../types/profileConfig";

export const profileConfig: ProfileConfig = {
	// 头像
	avatar: "/avatar.gif",

	// 名字
	name: "ACHUX21",

	// 个人签名
	bio: "CTF player & security researcher",

	// 链接配置
	links: [
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/ACHUX21",
			showName: false,
		},
		{
			name: "CTFtime",
			icon: "material-symbols:flag",
			url: "https://ctftime.org/user/150843",
			showName: false,
		},
		{
			name: "RSS",
			icon: "fa7-solid:rss",
			url: "/rss/",
			showName: false,
		},
	],
};
