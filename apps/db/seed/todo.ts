import { EnumTodoStatus } from '@inspin/enums'
import { db } from '@/src'

const data = [
  // 时尚与生活
  { description: '发布穿搭、旅行照片。', category: '时尚与生活' },
  { description: '记录日常生活中的有趣瞬间。', category: '时尚与生活' },

  // 学习与成长
  { description: '分享你正在学习的新知识或技能。', category: '学习与成长' },
  { description: '参加讲座或研讨会。', category: '学习与成长' },
  { description: '分享你最近完成的项目或任务。', category: '学习与成长' },

  // 内容创作
  { description: '撰写深度文章。', category: '内容创作' },
  { description: '分享与你专业领域相关的见解或分析。', category: '内容创作' },
  { description: '制作简短的视频教程。', category: '内容创作' },

  // 公益与正能量
  { description: '分享一件让你开心的小事。', category: '公益与正能量' },

  // 健康与运动
  { description: '发布运动打卡照片或视频。', category: '健康与运动' },
  { description: '分享健康食谱或饮食习惯。', category: '健康与运动' },
  { description: '分享生活小技巧或创意点子。', category: '健康与运动' },
  { description: '分享健身心得。', category: '健康与运动' },

  // 艺术与文化
  { description: '分享你最喜欢的名言。', category: '艺术与文化' },
  { description: '分享你最喜欢的艺术作品。', category: '艺术与文化' },
  { description: '分享你最喜欢的文学作品。', category: '艺术与文化' },
  { description: '分享你最喜欢的艺术家。', category: '艺术与文化' },

  // 摄影与视觉
  { description: '拍摄自然风光或城市风景。', category: '摄影与视觉' },
  { description: '拍摄你学习的日常。', category: '摄影与视觉' },
  { description: '发布一张旧照片。', category: '摄影与视觉' },

  // 旅行与探索
  { description: '分享你最喜欢的旅行目的地。', category: '旅行与探索' },
  { description: '分享你最近的一次冒险或挑战。', category: '旅行与探索' },
  { description: '分享你最近的一次旅行计划或梦想。', category: '旅行与探索' },

  // 美食与烹饪
  { description: '制作一个简短的烹饪视频。', category: '美食与烹饪' },
  { description: '分享你最喜欢的食物的故事。', category: '美食与烹饪' },
  { description: '分享你最喜欢的节日食物。', category: '美食与烹饪' },

  // 宠物与自然
  { description: '分享你喜欢的动物照片或视频。', category: '宠物与自然' },
  { description: '分享你最喜欢的自然奇观。', category: '宠物与自然' },
  { description: '去动物园、海洋馆或植物园。', category: '宠物与自然' },

  // 科技与工具
  { description: '分享你最喜欢的应用或工具。', category: '科技与工具' },
  { description: '分享你最喜欢的科技产品。', category: '科技与工具' },
  { description: '分享你最喜欢的社交媒体平台。', category: '科技与工具' },

  // 电影与娱乐
  { description: '推荐你喜欢的书籍、电影或音乐。', category: '电影与娱乐' },
  { description: '发布一个关于你最喜欢的电影场景的评论。', category: '电影与娱乐' },
  { description: '分享你最喜欢的电影配乐。', category: '电影与娱乐' },

  // 运动与游戏
  { description: '分享你最喜欢的运动。', category: '运动与游戏' },
  { description: '分享你最喜欢的游戏的故事。', category: '运动与游戏' },
  { description: '分享你最喜欢的游戏角色的评论。', category: '运动与游戏' },

  // 节日与传统
  { description: '分享你最喜欢的节日传统或习俗。', category: '节日与传统' },
  { description: '分享你最喜欢的节日活动。', category: '节日与传统' },
  { description: '分享你最喜欢的家庭传统或习惯。', category: '节日与传统' },

  // 音乐与表演
  { description: '发布一段音乐演奏或演唱的视频。', category: '音乐与表演' },
  { description: '分享你最喜欢的音乐专辑的评论。', category: '音乐与表演' },

  // 历史与科学
  { description: '分享你最喜欢的历史人物。', category: '历史与科学' },
  { description: '分享你最喜欢的历史事件的故事。', category: '历史与科学' },
  { description: '分享你最喜欢的科学发现的评论。', category: '历史与科学' },

  // 工作与学习环境
  { description: '展示你的工作空间或学习环境。', category: '工作与学习环境' },
  { description: '分享你的晨间或晚间例行活动。', category: '工作与学习环境' },

  // 互动与社交
  { description: '分享你最喜欢的社交活动。', category: '互动与社交' },

  // 手工艺与DIY
  { description: '发布一个你自制的手工艺品或DIY项目。', category: '手工艺与DIY' },
  { description: '分享你最喜欢的建筑风格的照片。', category: '手工艺与DIY' },

  // 购物与时尚
  { description: '分享你最近的一次购物经历。', category: '购物与时尚' },
  { description: '发布一个关于你最喜欢的服装品牌的评论。', category: '购物与时尚' },

  // 家乡与文化
  { description: '发布一个关于你家乡的照片或故事。', category: '家乡与文化' },

  // 个人成长
  { description: '写一封给未来自己的信。', category: '个人成长' },
  { description: '分享你认为最有用的生活建议。', category: '个人成长' },
  { description: '尝试新的爱好或活动。', category: '个人成长' },

  // 社会话题
  { description: '分享你对某个社会话题的看法。', category: '社会话题' },

  // 创新与实验
  { description: '尝试一种新的学习方法或技巧。', category: '创新与实验' },
  { description: '挑战自己完成一个之前从未做过的事情。', category: '创新与实验' },

  // 情感与心理
  { description: '记录你今天的三件好事。', category: '情感与心理' },
  { description: '写一封感谢信给重要的人。', category: '情感与心理' },
  { description: '分享一个改变你人生观的经历。', category: '情感与心理' },

  // 技能展示
  { description: '展示你的一个隐藏技能或才艺。', category: '技能展示' },
  { description: '教别人一个你擅长的技能。', category: '技能展示' },

  // 生活记录
  { description: '记录你今天的第一个想法。', category: '生活记录' },
  { description: '分享你今天的第一个微笑。', category: '生活记录' },
  { description: '记录你今天的最后一个想法。', category: '生活记录' },

  // 创意挑战
  { description: '描述你今天的心情。', category: '创意挑战' },
  { description: '创作一首短诗或歌词。', category: '创意挑战' },
  { description: '设计一个简单的logo或图案。', category: '创意挑战' },

  // 时间胶囊
  { description: '给一年后的自己写一封信。', category: '时间胶囊' },
  { description: '记录一个你希望记住的瞬间。', category: '时间胶囊' },
  { description: '分享一个你童年的美好回忆。', category: '时间胶囊' },

  // 环保与公益
  { description: '分享一个环保小贴士或行动。', category: '环保与公益' },
  { description: '分享一个帮助他人的小故事。', category: '环保与公益' },

  // 美食探索
  { description: '分享一个独特的食材搭配。', category: '美食探索' },
  { description: '记录一次特别的用餐体验。', category: '美食探索' },

  // 学习分享
  { description: '分享一个你最近学到的冷知识。', category: '学习分享' },
  { description: '推荐一个有用的学习资源。', category: '学习分享' },
  { description: '分享一个学习中的失败和收获。', category: '学习分享' },

  // 生活美学
  { description: '分享一个提升生活品质的小物件。', category: '生活美学' },
  { description: '展示你的桌面或工作台布置。', category: '生活美学' },
  { description: '分享一个生活仪式感的小细节。', category: '生活美学' },

  // 思维启发
  { description: '分享一个让你深思的问题。', category: '思维启发' },
  { description: '记录一个突然的灵感或想法。', category: '思维启发' },
  { description: '分享一个改变你思维方式的书籍或文章。', category: '思维启发' },

  // 社交连接
  { description: '介绍一个有趣的朋友或同事。', category: '社交连接' },
  { description: '分享一个线上或线下的社交活动。', category: '社交连接' },
  { description: '记录一次有意义的对话或交流。', category: '社交连接' },

  // 未来规划
  { description: '分享你的一个短期目标。', category: '未来规划' },
  { description: '记录一个你正在进行的项目进展。', category: '未来规划' },
  { description: '分享一个你梦想中的生活方式。', category: '未来规划' },

  // 文化体验
  { description: '体验一种新的文化或传统。', category: '文化体验' },
  { description: '学习一句新的外语表达。', category: '文化体验' },
  { description: '分享一个不同文化背景的故事。', category: '文化体验' },

  // 科技应用
  { description: '分享一个提高效率的科技小技巧。', category: '科技应用' },
  { description: '体验一个新的APP或软件功能。', category: '科技应用' },
  { description: '分享一个科技改变生活的例子。', category: '科技应用' },

  // 自然观察
  { description: '观察并记录一个自然现象。', category: '自然观察' },
  { description: '分享一个季节变化的细节。', category: '自然观察' },
  { description: '记录一次户外活动的感受。', category: '自然观察' },

  // 创意表达
  { description: '用表情符号讲述一个故事。', category: '创意表达' },
  { description: '创作一个简单的漫画或插画。', category: '创意表达' },
  { description: '用声音或音乐表达一种情感。', category: '创意表达' },

  // 反思总结
  { description: '总结这一周学到的东西。', category: '反思总结' },
  { description: '反思一个最近的决定。', category: '反思总结' },
]

export async function seedTodo() {
  await db.todo.createMany(data.map(item => ({
    ...item,
    status: EnumTodoStatus.Active,
  })))
}
