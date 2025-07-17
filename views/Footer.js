export default function Footer() {
	return {
		tag: "footer",
		attributes: [["class", "app-footer"]],
		children: [
			{
				tag: "div",
				attributes: [["class", "footer-container"]],
				children: [
					{
						tag: "div",
						attributes: [["class", "footer-content"]],
						children: [
							{
								tag: "div",
								attributes: [["class", "footer-left"]],
								children: [
									{
										tag: "div",
										attributes: [["class", "footer-section"]],
										children: [
											{
												tag: "ul",
												attributes: [["class", "footer-section"]],
												children: [
													{ 
														tag: "li", 
														attributes: [["class", "h2-footer"]], 
														children: ["Accueil"] 
													},
													{ 
														tag: "li", 
														attributes: [["class", "h2-footer"]], 
														children: ["À propos"] 
													},
													{ 
														tag: "li", 
														attributes: [["class", "h2-footer"]], 
														children: ["Événements"] 
													},
													{ 
														tag: "li", 
														attributes: [["class", "h2-footer"]], 
														children: ["Communautés"] 
													},
													{ 
														tag: "li", 
														attributes: [["class", "h2-footer"]], 
														children: ["Contact"] 
													},
												],
											},
										],
									},
									{
										tag: "div",
										attributes: [["class", "footer-section"]],
										children: [
											{
												tag: "h2",
												attributes: [["class", "h2-footer"]], 
												children: ["Mon compte"]
											},
											{
												tag: "ul",
												attributes: [["class", "footer-section-compte"]],
												children: [
													{ 
														tag: "li",
														attributes: [["class", "h2"]],
														children: ["Profil"] 
													},
													{ 
														tag: "li",
														attributes: [["class", "h2"]],
														children: ["Dashboard"] 
													},
													{ 
														tag: "li",
														attributes: [["class", "h2"]],
														children: ["Notifications"] 
													},
													{ 
														tag: "li",
														attributes: [["class", "h2"]],
														children: ["Calendrier"] 
													},
												],
											},
										],
									},
								],
							},
							{
								tag: "div",
								attributes: [["class", "footer-right"]],
								children: [
									{
										tag: "a",
										attributes: [["class", "card-big cornflower-blue"], ["href", "#organiser"]],
										children: [
											{ tag: "p", children: ["Organiser un événement"] },
										],
									},
									{
										tag: "a",
										attributes: [["class", "card-big alice-blue"], ["href", "#profil"]],
										children: [
											{ tag: "p", children: ["Mon espace perso"] },
										],
									},
								],
							},
						],
					},
					{
						tag: "div",
						attributes: [["class", "footer-bottom"]],
						children: [
							{
								tag: "div",
								attributes: [["class", "footer-logo"]],
								children: [
									{
										tag: "div",
										attributes: [["class", "logo-icon"]],
									},
								],
							},
						],
					},
				],
			},
		],
	};
}
