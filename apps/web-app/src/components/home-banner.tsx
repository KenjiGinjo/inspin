export function HomeBanner() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-background to-purple-50/30" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-200/20 to-purple-200/20 rounded-full blur-2xl" />

      <div className="relative px-4 sm:px-6 py-12 sm:py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
            每天一个小改变，慢慢变成更好的自己
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto">
            从今天开始，给自己一些新的尝试
          </p>
        </div>
      </div>
    </div>
  )
}
