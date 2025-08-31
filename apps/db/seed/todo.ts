import { EnumTodoStatus } from '@inspin/enums'
import { db } from '@/src'

const data = [
  // 时尚与生活
  { description: '发布穿搭、旅行照片，分享你对时尚趋势的见解。', category: '时尚与生活' },
  { description: '记录日常生活中的有趣瞬间，保持真实和亲和力。', category: '时尚与生活' },
  { description: '分享日常生活中的小趣事，配上幽默的文字和表情包。', category: '时尚与生活' },

  // 学习与成长
  { description: '分享你正在学习的新知识或技能，记录学习过程。', category: '学习与成长' },
  { description: '参加讲座或研讨会，并分享照片和感想。', category: '学习与成长' },
  { description: '分享你最近完成的项目或任务，展示成果。', category: '学习与成长' },

  // 内容创作
  { description: '撰写深度文章，分享个人见解和生活体验。', category: '内容创作' },
  { description: '分享与你专业领域相关的见解或分析。', category: '内容创作' },
  { description: '制作简短的视频教程，教大家一个小技能。', category: '内容创作' },
  { description: '分享你最近的一次创意写作作品。', category: '内容创作' },

  // 公益与正能量
  { description: '发布参与公益活动的照片或视频，激励他人。', category: '公益与正能量' },
  { description: '分享一件让你开心的小事，传递正能量。', category: '公益与正能量' },
  { description: '分享你最近的一次志愿者经历。', category: '公益与正能量' },

  // 健康与运动
  { description: '发布运动打卡照片或视频，分享健身心得。', category: '健康与运动' },
  { description: '分享健康食谱或饮食习惯，附上简单的做法。', category: '健康与运动' },
  { description: '分享生活小技巧或创意点子。', category: '健康与运动' },

  // 艺术与文化
  { description: '分享你最喜欢的名言，并解释为何对你有意义。', category: '艺术与文化' },
  { description: '分享你最喜欢的艺术作品，并分享你的感受。', category: '艺术与文化' },
  { description: '分享你最喜欢的文学作品，并解释其影响。', category: '艺术与文化' },
  { description: '分享你最喜欢的艺术家或乐队，并解释原因。', category: '艺术与文化' },

  // 摄影与视觉
  { description: '拍摄自然风光或城市风景，分享你的摄影技巧。', category: '摄影与视觉' },
  { description: '拍摄你学习的日常，比如阅读、上课或实验过程。', category: '摄影与视觉' },
  { description: '发布一张旧照片，讲述背后的故事。', category: '摄影与视觉' },

  // 旅行与探索
  { description: '分享你最喜欢的旅行目的地，并推荐活动。', category: '旅行与探索' },
  { description: '分享你最近的一次冒险或挑战。', category: '旅行与探索' },
  { description: '分享你最近的一次旅行计划或梦想。', category: '旅行与探索' },

  // 美食与烹饪
  { description: '制作一个简短的烹饪视频，展示简单的菜肴。', category: '美食与烹饪' },
  { description: '分享你最喜欢的食物的故事。', category: '美食与烹饪' },
  { description: '分享你最喜欢的节日食物，并解释其意义。', category: '美食与烹饪' },

  // 宠物与自然
  { description: '分享你喜欢的动物照片或视频，讲述它们的趣事。', category: '宠物与自然' },
  { description: '分享你最喜欢的自然奇观，并解释其魅力。', category: '宠物与自然' },
  { description: '去动物园、海洋馆或植物园，并分享照片。', category: '宠物与自然' },

  // 科技与工具
  { description: '分享你最喜欢的应用或工具，并解释为什么。', category: '科技与工具' },
  { description: '分享你最喜欢的科技产品，并解释其用途。', category: '科技与工具' },
  { description: '分享你最喜欢的社交媒体平台，并解释原因。', category: '科技与工具' },

  // 电影与娱乐
  { description: '推荐你喜欢的书籍、电影或音乐，写一些简短的评论。', category: '电影与娱乐' },
  { description: '发布一个关于你最喜欢的电影场景的评论。', category: '电影与娱乐' },
  { description: '分享你最喜欢的电影配乐，并解释其影响。', category: '电影与娱乐' },

  // 运动与游戏
  { description: '分享你最喜欢的运动，并解释为什么。', category: '运动与游戏' },
  { description: '分享你最喜欢的游戏的故事。', category: '运动与游戏' },
  { description: '分享你最喜欢的游戏角色的评论。', category: '运动与游戏' },

  // 节日与传统
  { description: '分享你最喜欢的节日传统或习俗。', category: '节日与传统' },
  { description: '分享你最喜欢的节日活动，并解释为什么。', category: '节日与传统' },
  { description: '分享你最喜欢的家庭传统或习惯。', category: '节日与传统' },

  // 音乐与表演
  { description: '发布一段音乐演奏或演唱的视频。', category: '音乐与表演' },
  { description: '分享你最喜欢的音乐专辑的评论。', category: '音乐与表演' },
  { description: '分享你最喜欢的音乐节的故事。', category: '音乐与表演' },

  // 历史与科学
  { description: '分享你最喜欢的历史人物，并解释原因。', category: '历史与科学' },
  { description: '分享你最喜欢的历史事件的故事。', category: '历史与科学' },
  { description: '分享你最喜欢的科学发现的评论。', category: '历史与科学' },

  // 工作与学习环境
  { description: '展示你的工作空间或学习环境，分享整理技巧。', category: '工作与学习环境' },
  { description: '分享你的晨间或晚间例行活动。', category: '工作与学习环境' },

  // 互动与社交
  { description: '分享你最喜欢的社交活动，并解释其乐趣。', category: '互动与社交' },

  // 手工艺与DIY
  { description: '发布一个你自制的手工艺品或DIY项目。', category: '手工艺与DIY' },
  { description: '分享你最喜欢的建筑风格的照片。', category: '手工艺与DIY' },

  // 购物与时尚
  { description: '分享你最近的一次购物经历。', category: '购物与时尚' },
  { description: '发布一个关于你最喜欢的服装品牌的评论。', category: '购物与时尚' },

  // 家乡与文化
  { description: '发布一个关于你家乡的照片或故事。', category: '家乡与文化' },
  { description: '发布一段关于你文化背景的小故事。', category: '家乡与文化' },

  // 个人成长
  { description: '写一封给未来自己的信，并分享部分内容。', category: '个人成长' },
  { description: '分享你认为最有用的生活建议。', category: '个人成长' },
  { description: '尝试新的爱好或活动，并记录你的体验。', category: '个人成长' },

  // 社会话题
  { description: '分享你对某个社会话题的看法，鼓励讨论。', category: '社会话题' },
  { description: '发布一段关于你一天生活的短视频。', category: '社会话题' },
  { description: '记录你的一天，分享你学到的新知识。', category: '社会话题' },
]

export async function seedTodo() {
  await db.todo.createMany(data.map(item => ({
    ...item,
    status: EnumTodoStatus.Active,
  })))
}
