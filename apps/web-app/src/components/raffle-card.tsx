import { useState } from 'react'
import { randomSelect, randomSelectMultiple } from '../../../../raffle'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'

const taskCategories = {
  时尚与生活: [
    '发布穿搭、旅行照片，分享你对时尚趋势的见解。',
    '记录日常生活中的有趣瞬间，保持真实和亲和力。',
    '分享日常生活中的小趣事，配上幽默的文字和表情包。',
  ],
  学习与成长: [
    '分享你正在学习的新知识或技能，记录学习过程。',
    '参加讲座或研讨会，并分享照片和感想。',
    '分享你最近完成的项目或任务，展示成果。',
  ],
  内容创作: [
    '撰写深度文章，分享个人见解和生活体验。',
    '分享与你专业领域相关的见解或分析。',
    '制作简短的视频教程，教大家一个小技能。',
    '分享你最近的一次创意写作作品。',
  ],
  公益与正能量: [
    '发布参与公益活动的照片或视频，激励他人。',
    '分享一件让你开心的小事，传递正能量。',
    '分享你最近的一次志愿者经历。',
  ],
  健康与运动: [
    '发布运动打卡照片或视频，分享健身心得。',
    '分享健康食谱或饮食习惯，附上简单的做法。',
    '分享生活小技巧或创意点子。',
  ],
  艺术与文化: [
    '分享你最喜欢的名言，并解释为何对你有意义。',
    '分享你最喜欢的艺术作品，并分享你的感受。',
    '分享你最喜欢的文学作品，并解释其影响。',
    '分享你最喜欢的艺术家或乐队，并解释原因。',
  ],
  摄影与视觉: [
    '拍摄自然风光或城市风景，分享你的摄影技巧。',
    '拍摄你学习的日常，比如阅读、上课或实验过程。',
    '发布一张旧照片，讲述背后的故事。',
  ],
  旅行与探索: [
    '分享你最喜欢的旅行目的地，并推荐活动。',
    '分享你最近的一次冒险或挑战。',
    '分享你最近的一次旅行计划或梦想。',
  ],
  美食与烹饪: [
    '制作一个简短的烹饪视频，展示简单的菜肴。',
    '分享你最喜欢的食物的故事。',
    '分享你最喜欢的节日食物，并解释其意义。',
  ],
  宠物与自然: [
    '分享你喜欢的动物照片或视频，讲述它们的趣事。',
    '分享你最喜欢的自然奇观，并解释其魅力。',
    '去动物园、海洋馆或植物园，并分享照片。',
  ],
  科技与工具: [
    '分享你最喜欢的应用或工具，并解释为什么。',
    '分享你最喜欢的科技产品，并解释其用途。',
    '分享你最喜欢的社交媒体平台，并解释原因。',
  ],
  电影与娱乐: [
    '推荐你喜欢的书籍、电影或音乐，写一些简短的评论。',
    '发布一个关于你最喜欢的电影场景的评论。',
    '分享你最喜欢的电影配乐，并解释其影响。',
  ],
  运动与游戏: [
    '分享你最喜欢的运动，并解释为什么。',
    '分享你最喜欢的游戏的故事。',
    '分享你最喜欢的游戏角色的评论。',
  ],
  节日与传统: [
    '分享你最喜欢的节日传统或习俗。',
    '分享你最喜欢的节日活动，并解释为什么。',
    '分享你最喜欢的家庭传统或习惯。',
  ],
  音乐与表演: [
    '发布一段音乐演奏或演唱的视频。',
    '分享你最喜欢的音乐专辑的评论。',
    '分享你最喜欢的音乐节的故事。',
  ],
  历史与科学: [
    '分享你最喜欢的历史人物，并解释原因。',
    '分享你最喜欢的历史事件的故事。',
    '分享你最喜欢的科学发现的评论。',
  ],
  工作与学习环境: [
    '展示你的工作空间或学习环境，分享整理技巧。',
    '分享你的晨间或晚间例行活动。',
  ],
  互动与社交: [
    '分享你最喜欢的社交活动，并解释其乐趣。',
  ],
  手工艺与DIY: [
    '发布一个你自制的手工艺品或DIY项目。',
    '分享你最喜欢的建筑风格的照片。',
  ],
  购物与时尚: [
    '分享你最近的一次购物经历。',
    '发布一个关于你最喜欢的服装品牌的评论。',
  ],
  家乡与文化: [
    '发布一个关于你家乡的照片或故事。',
    '发布一段关于你文化背景的小故事。',
  ],
  个人成长: [
    '写一封给未来自己的信，并分享部分内容。',
    '分享你认为最有用的生活建议。',
    '尝试新的爱好或活动，并记录你的体验。',
  ],
  社会话题: [
    '分享你对某个社会话题的看法，鼓励讨论。',
    '发布一段关于你一天生活的短视频。',
    '记录你的一天，分享你学到的新知识。',
  ],
}

export function RaffleCard() {
  const [currentTask, setCurrentTask] = useState<string | null>(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [taskHistory, setTaskHistory] = useState<string[]>([])
  const [completedTasks, setCompletedTasks] = useState<number>(0)
  const [favoriteCategory, setFavoriteCategory] = useState<string>('')

  const spinRaffle = () => {
    setIsSpinning(true)

    setTimeout(() => {
      let selectedTask: string

      if (favoriteCategory && taskCategories[favoriteCategory as keyof typeof taskCategories]) {
        // 如果选择了喜欢的分类，优先从该分类中选择
        const categoryTasks = taskCategories[favoriteCategory as keyof typeof taskCategories]
        selectedTask = randomSelect(categoryTasks)
      }
      else {
        // 否则从所有任务中随机选择
        const allTasks = Object.values(taskCategories).flat()
        selectedTask = randomSelect(allTasks)
      }

      setCurrentTask(selectedTask)
      setTaskHistory(prev => [selectedTask, ...prev.slice(0, 4)])
      setIsSpinning(false)
    }, 1000)
  }

  const getRandomTasks = (count: number = 3) => {
    const allTasks = Object.values(taskCategories).flat()
    return randomSelectMultiple(allTasks, count)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-pink-600">
            🎯 每日任务抽奖
          </CardTitle>
          <CardDescription className="text-gray-600">
            点击抽奖按钮，获得今日创意任务！
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-pink-600">{completedTasks}</div>
              <div className="text-sm text-gray-600">已完成任务</div>
            </div>
            <div className="bg-white/50 rounded-lg p-3">
              <div className="text-2xl font-bold text-purple-600">{taskHistory.length}</div>
              <div className="text-sm text-gray-600">抽奖次数</div>
            </div>
          </div>
          <Button
            onClick={spinRaffle}
            disabled={isSpinning}
            className={`w-32 h-32 rounded-full text-lg font-bold transition-all duration-300 ${
              isSpinning
                ? 'bg-gradient-to-r from-yellow-400 to-orange-500 animate-bounce shadow-lg'
                : 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 hover:scale-105 shadow-lg hover:shadow-xl'
            }`}
          >
            {isSpinning ? '🎲 抽奖中...' : '🎲 开始抽奖'}
          </Button>

          {currentTask && (
            <div className="mt-6 p-4 bg-white rounded-lg border-2 border-pink-300 shadow-lg">
              <h3 className="text-lg font-semibold text-pink-600 mb-2">
                🎉 今日任务
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                {currentTask}
              </p>
              <div className="flex gap-2 justify-center">
                <Button
                  onClick={() => {
                    setCompletedTasks(prev => prev + 1)
                    setCurrentTask(null)
                  }}
                  className="bg-green-500 hover:bg-green-600"
                >
                  ✅ 完成任务
                </Button>
                <Button
                  onClick={() => setCurrentTask(null)}
                  variant="outline"
                >
                  ❌ 跳过任务
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {taskHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-700">
              📝 最近任务记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {taskHistory.map((task, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border-l-4 border-pink-400">
                  <p className="text-sm text-gray-600">{task}</p>
                  <span className="text-xs text-gray-400">
                    {index === 0 ? '刚刚' : `${index} 次前`}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            💡 推荐任务
          </CardTitle>
          <CardDescription>
            不知道做什么？试试这些创意任务吧！
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getRandomTasks(6).map((task: string, index: number) => (
              <div key={index} className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-700">{task}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  推荐任务
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-700">
            🏷️ 任务分类
          </CardTitle>
          <CardDescription>
            选择你感兴趣的任务类型
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(taskCategories).map(category => (
              <Badge
                key={category}
                variant={favoriteCategory === category ? 'default' : 'outline'}
                className={`cursor-pointer transition-colors text-center py-2 ${
                  favoriteCategory === category
                    ? 'bg-pink-500 text-white'
                    : 'hover:bg-pink-100 hover:border-pink-300'
                }`}
                onClick={() => setFavoriteCategory(favoriteCategory === category ? '' : category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
