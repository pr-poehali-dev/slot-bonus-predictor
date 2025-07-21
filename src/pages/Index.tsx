import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzePrediction = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setPrediction({
        nextBonus: Math.floor(Math.random() * 50) + 10,
        confidence: Math.floor(Math.random() * 8) + 92,
        pattern: 'Высокая активность',
        recommendation: 'Продолжить игру'
      });
      setAnalyzing(false);
    }, 3000);
  };

  const mockHistory = [
    { id: 1, date: '21.07.2025', prediction: 23, actual: 25, accuracy: 92 },
    { id: 2, date: '20.07.2025', prediction: 45, actual: 43, accuracy: 96 },
    { id: 3, date: '19.07.2025', prediction: 12, actual: 15, accuracy: 80 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-casino-black via-casino-black-light to-casino-red-light/10 font-inter">
      {/* Decorative Casino Elements */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-pulse">♠</div>
        <div className="absolute top-32 right-20 text-6xl animate-pulse">♥</div>
        <div className="absolute bottom-40 left-20 text-6xl animate-pulse">♣</div>
        <div className="absolute bottom-20 right-32 text-6xl animate-pulse">♦</div>
      </div>

      {/* Header */}
      <header className="border-b border-casino-gold/30 bg-casino-black/90 backdrop-blur-md relative">
        <div className="absolute inset-0 bg-gradient-to-r from-casino-gold/5 to-casino-red/5"></div>
        <div className="container mx-auto px-4 py-6 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-br from-casino-gold to-casino-gold-dark rounded-full flex items-center justify-center mr-4 shadow-lg">
                <span className="text-2xl">🎰</span>
              </div>
              <div>
                <h1 className="text-3xl font-playfair font-bold bg-gradient-to-r from-casino-gold via-casino-gold-light to-casino-gold bg-clip-text text-transparent">
                  ROYAL CASINO
                </h1>
                <p className="text-casino-gold/70 text-sm font-inter">Slot Pattern Analyzer</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-gradient-to-r from-casino-gold/20 to-casino-gold-dark/20 border border-casino-gold/40 text-casino-gold-light">
                ♠ AI Analysis ♠
              </Badge>
              <Button className="bg-gradient-to-r from-casino-red to-casino-red-light hover:from-casino-red-light hover:to-casino-red text-white border border-casino-gold/30">
                <Icon name="Crown" size={16} className="mr-2" />
                VIP Profile
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-gradient-to-r from-casino-black-light to-casino-black border border-casino-gold/30 shadow-xl">
            <TabsTrigger 
              value="analyze" 
              className="font-playfair font-semibold text-casino-gold-light data-[state=active]:bg-gradient-to-r data-[state=active]:from-casino-gold data-[state=active]:to-casino-gold-dark data-[state=active]:text-casino-black"
            >
              <Icon name="Camera" size={18} className="mr-2" />
              ♦ Анализ
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="font-playfair font-semibold text-casino-gold-light data-[state=active]:bg-gradient-to-r data-[state=active]:from-casino-gold data-[state=active]:to-casino-gold-dark data-[state=active]:text-casino-black"
            >
              <Icon name="History" size={18} className="mr-2" />
              ♠ История
            </TabsTrigger>
            <TabsTrigger 
              value="stats" 
              className="font-playfair font-semibold text-casino-gold-light data-[state=active]:bg-gradient-to-r data-[state=active]:from-casino-gold data-[state=active]:to-casino-gold-dark data-[state=active]:text-casino-black"
            >
              <Icon name="BarChart3" size={18} className="mr-2" />
              ♥ Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="bg-gradient-to-br from-casino-black-light to-casino-black border border-casino-gold/30 text-white shadow-2xl">
                <CardHeader className="border-b border-casino-gold/20">
                  <CardTitle className="font-playfair font-bold text-casino-gold-light flex items-center text-xl">
                    <Icon name="Upload" size={24} className="mr-3 text-casino-gold" />
                    ♣ Загрузка фото слота
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 p-6">
                  <div className="border-2 border-dashed border-casino-gold/40 rounded-xl p-8 text-center hover:border-casino-gold/60 transition-all duration-300 bg-gradient-to-br from-casino-gold/5 to-transparent">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded slot" 
                          className="max-w-full h-48 mx-auto rounded-xl object-cover border-2 border-casino-gold/40 shadow-lg"
                        />
                        <Button 
                          onClick={() => setUploadedImage(null)}
                          variant="outline"
                          className="border-casino-red text-casino-red-light hover:bg-casino-red hover:text-white"
                        >
                          <Icon name="RotateCcw" size={16} className="mr-2" />
                          Заменить фото
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-casino-gold/20 to-casino-gold-dark/20 rounded-full flex items-center justify-center">
                          <Icon name="ImagePlus" size={32} className="text-casino-gold" />
                        </div>
                        <h3 className="font-playfair text-xl text-casino-gold-light mb-2">Добавить изображение слота</h3>
                        <p className="text-casino-gold/70 mb-6 font-inter">Перетащите фото или выберите файл</p>
                        <Input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload}
                          className="hidden" 
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <Button 
                            asChild 
                            className="bg-gradient-to-r from-casino-gold to-casino-gold-dark hover:from-casino-gold-light hover:to-casino-gold text-casino-black font-playfair font-semibold text-lg px-8 py-3 shadow-lg"
                          >
                            <span className="cursor-pointer">
                              <Icon name="Sparkles" size={20} className="mr-2" />
                              Выбрать фото
                            </span>
                          </Button>
                        </label>
                      </>
                    )}
                  </div>
                  
                  {uploadedImage && (
                    <Button 
                      onClick={analyzePrediction}
                      disabled={analyzing}
                      className="w-full bg-gradient-to-r from-casino-red to-casino-red-light hover:from-casino-red-light hover:to-casino-red text-white font-playfair font-bold text-xl py-8 shadow-xl border border-casino-gold/30"
                    >
                      {analyzing ? (
                        <>
                          <Icon name="Loader2" size={24} className="mr-3 animate-spin" />
                          ♦ Анализирую магию...
                        </>
                      ) : (
                        <>
                          <Icon name="Zap" size={24} className="mr-3" />
                          ♠ АНАЛИЗИРОВАТЬ ♠
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="bg-gradient-to-br from-casino-black-light to-casino-black border border-casino-gold/30 text-white shadow-2xl">
                <CardHeader className="border-b border-casino-gold/20">
                  <CardTitle className="font-playfair font-bold text-casino-gold-light flex items-center text-xl">
                    <Icon name="Target" size={24} className="mr-3 text-casino-gold" />
                    ♥ Результаты предсказания
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {analyzing ? (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <div className="text-8xl mb-6 animate-slot-spin">🎰</div>
                        <div className="flex justify-center space-x-2 mb-4">
                          <div className="text-4xl animate-pulse">♠</div>
                          <div className="text-4xl animate-pulse" style={{animationDelay: '0.2s'}}>♥</div>
                          <div className="text-4xl animate-pulse" style={{animationDelay: '0.4s'}}>♣</div>
                          <div className="text-4xl animate-pulse" style={{animationDelay: '0.6s'}}>♦</div>
                        </div>
                        <p className="text-casino-gold-light font-playfair text-lg mb-4">Анализирую удачу...</p>
                        <Progress value={66} className="max-w-xs mx-auto" />
                      </div>
                    </div>
                  ) : prediction ? (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center p-8 bg-gradient-to-br from-casino-gold/10 via-casino-gold-light/5 to-casino-red/5 rounded-xl border-2 border-casino-gold/40 shadow-inner">
                        <div className="text-4xl mb-4">🏆</div>
                        <h3 className="text-2xl font-playfair font-bold text-casino-gold-light mb-3">
                          Предсказание Джекпота
                        </h3>
                        <div className="text-5xl font-playfair font-black bg-gradient-to-r from-casino-gold via-casino-gold-light to-casino-gold bg-clip-text text-transparent mb-4">
                          {prediction.nextBonus}
                        </div>
                        <p className="text-lg text-casino-gold/90 font-inter mb-4">спинов до бонуса</p>
                        <Badge className="bg-gradient-to-r from-casino-green to-casino-green-light text-white font-semibold text-lg px-4 py-2">
                          ♠ Точность: {prediction.confidence}% ♠
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-gradient-to-br from-casino-purple/20 to-casino-purple-light/10 rounded-xl border border-casino-gold/30">
                          <div className="text-3xl mb-3">📊</div>
                          <p className="text-sm text-casino-gold/70 font-inter mb-2">Паттерн</p>
                          <p className="font-playfair font-semibold text-casino-gold-light">{prediction.pattern}</p>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-casino-green/20 to-casino-green-light/10 rounded-xl border border-casino-gold/30">
                          <div className="text-3xl mb-3">💡</div>
                          <p className="text-sm text-casino-gold/70 font-inter mb-2">Совет</p>
                          <p className="font-playfair font-semibold text-casino-green-light">{prediction.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-casino-gold/50">
                      <div className="text-6xl mb-6">🎲</div>
                      <h3 className="font-playfair text-xl text-casino-gold-light mb-2">Готов к анализу</h3>
                      <p className="font-inter">Загрузите фото слота для предсказания</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-gradient-to-br from-casino-black-light to-casino-black border border-casino-gold/30 text-white shadow-2xl">
              <CardHeader className="border-b border-casino-gold/20">
                <CardTitle className="font-playfair font-bold text-casino-gold-light flex items-center text-xl">
                  <Icon name="Clock" size={24} className="mr-3 text-casino-gold" />
                  ♠ История предсказаний
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockHistory.map((item, index) => (
                    <div key={item.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-casino-black-light to-casino-purple/10 rounded-xl border border-casino-gold/20 hover:border-casino-gold/40 transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-casino-gold/20 to-casino-gold-dark/20 rounded-full flex items-center justify-center border border-casino-gold/40">
                          <div className="text-2xl">
                            {index === 0 ? '♠' : index === 1 ? '♥' : '♦'}
                          </div>
                        </div>
                        <div>
                          <p className="font-playfair font-semibold text-casino-gold-light text-lg">{item.date}</p>
                          <p className="text-casino-gold/70 font-inter">Предсказание: {item.prediction} спинов</p>
                          <p className="text-white/70 text-sm font-inter">Результат: {item.actual} спинов</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={`${
                            item.accuracy >= 90 
                              ? 'bg-gradient-to-r from-casino-green to-casino-green-light text-white' 
                              : item.accuracy >= 80 
                              ? 'bg-gradient-to-r from-casino-gold to-casino-gold-dark text-casino-black'
                              : 'bg-gradient-to-r from-casino-red to-casino-red-light text-white'
                          } font-semibold text-lg px-4 py-2`}
                        >
                          {item.accuracy}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-gradient-to-br from-casino-black-light to-casino-purple/20 border border-casino-gold/30 text-white shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🎯</div>
                  <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-casino-gold to-casino-gold-light bg-clip-text text-transparent mb-2">89%</h3>
                  <p className="text-casino-gold/70 font-inter">Средняя точность</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-casino-black-light to-casino-red/20 border border-casino-gold/30 text-white shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">🎰</div>
                  <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-casino-red to-casino-red-light bg-clip-text text-transparent mb-2">142</h3>
                  <p className="text-casino-gold/70 font-inter">Всего анализов</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-casino-black-light to-casino-green/20 border border-casino-gold/30 text-white shadow-2xl">
                <CardContent className="p-8 text-center">
                  <div className="text-5xl mb-4">👑</div>
                  <h3 className="font-playfair text-3xl font-bold bg-gradient-to-r from-casino-green to-casino-green-light bg-clip-text text-transparent mb-2">23</h3>
                  <p className="text-casino-gold/70 font-inter">Джекпот попаданий</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-casino-gold/30 bg-gradient-to-r from-casino-black via-casino-black-light to-casino-black mt-16">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <span className="text-2xl">♠</span>
            <span className="text-2xl">♥</span>
            <span className="text-2xl">♣</span>
            <span className="text-2xl">♦</span>
          </div>
          <p className="text-casino-gold/70 font-playfair text-lg">
            Royal Casino • Powered by AI Magic ✨
          </p>
          <p className="text-casino-gold/50 font-inter text-sm mt-2">
            Анализ слот-машин премиум класса
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;