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
        confidence: Math.floor(Math.random() * 30) + 70,
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
    <div className="min-h-screen bg-gradient-to-br from-casino-navy via-casino-navy-light to-black">
      {/* Header */}
      <header className="border-b border-casino-gold/20 bg-casino-navy/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-orbitron font-bold bg-gradient-to-r from-casino-gold to-casino-orange bg-clip-text text-transparent">
              🎰 CASINO SLOT ANALYZER
            </h1>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-casino-gold text-casino-gold">
                ИИ Анализ
              </Badge>
              <Button variant="outline" className="border-casino-gold text-casino-gold hover:bg-casino-gold hover:text-casino-navy">
                <Icon name="User" size={20} className="mr-2" />
                Профиль
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="analyze" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-casino-navy-light border-casino-gold/20">
            <TabsTrigger 
              value="analyze" 
              className="font-orbitron text-casino-gold data-[state=active]:bg-casino-gold data-[state=active]:text-casino-navy"
            >
              <Icon name="Camera" size={20} className="mr-2" />
              Анализ
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="font-orbitron text-casino-gold data-[state=active]:bg-casino-gold data-[state=active]:text-casino-navy"
            >
              <Icon name="History" size={20} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger 
              value="stats" 
              className="font-orbitron text-casino-gold data-[state=active]:bg-casino-gold data-[state=active]:text-casino-navy"
            >
              <Icon name="BarChart3" size={20} className="mr-2" />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="bg-casino-navy-light border-casino-gold/20 text-white">
                <CardHeader>
                  <CardTitle className="font-orbitron text-casino-gold flex items-center">
                    <Icon name="Upload" size={24} className="mr-2" />
                    Загрузка фото слота
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-casino-gold/30 rounded-lg p-8 text-center hover:border-casino-gold/50 transition-colors">
                    {uploadedImage ? (
                      <div className="space-y-4">
                        <img 
                          src={uploadedImage} 
                          alt="Uploaded slot" 
                          className="max-w-full h-48 mx-auto rounded-lg object-cover border border-casino-gold/30"
                        />
                        <Button 
                          onClick={() => setUploadedImage(null)}
                          variant="outline"
                          className="border-casino-orange text-casino-orange hover:bg-casino-orange hover:text-white"
                        >
                          Заменить фото
                        </Button>
                      </div>
                    ) : (
                      <>
                        <Icon name="ImagePlus" size={48} className="mx-auto mb-4 text-casino-gold" />
                        <p className="text-casino-gold mb-4">Перетащите фото слота или нажмите для выбора</p>
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
                            className="bg-gradient-to-r from-casino-gold to-casino-orange hover:from-casino-gold-dark hover:to-casino-orange-dark font-orbitron font-semibold"
                          >
                            <span className="cursor-pointer">Выбрать фото</span>
                          </Button>
                        </label>
                      </>
                    )}
                  </div>
                  
                  {uploadedImage && (
                    <Button 
                      onClick={analyzePrediction}
                      disabled={analyzing}
                      className="w-full bg-gradient-to-r from-casino-gold to-casino-orange hover:from-casino-gold-dark hover:to-casino-orange-dark font-orbitron font-semibold text-lg py-6"
                    >
                      {analyzing ? (
                        <>
                          <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                          Анализирую...
                        </>
                      ) : (
                        <>
                          <Icon name="Zap" size={20} className="mr-2" />
                          АНАЛИЗИРОВАТЬ
                        </>
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Results Section */}
              <Card className="bg-casino-navy-light border-casino-gold/20 text-white">
                <CardHeader>
                  <CardTitle className="font-orbitron text-casino-gold flex items-center">
                    <Icon name="Target" size={24} className="mr-2" />
                    Результаты анализа
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {analyzing ? (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <div className="animate-slot-spin text-6xl mb-4">🎰</div>
                        <p className="text-casino-gold font-orbitron">Анализирую паттерны...</p>
                        <Progress value={33} className="mt-4" />
                      </div>
                    </div>
                  ) : prediction ? (
                    <div className="space-y-6 animate-fade-in">
                      <div className="text-center p-6 bg-gradient-to-r from-casino-gold/10 to-casino-orange/10 rounded-lg border border-casino-gold/30">
                        <h3 className="text-2xl font-orbitron font-bold text-casino-gold mb-2">
                          Предсказание бонуса
                        </h3>
                        <div className="text-4xl font-orbitron font-black text-casino-orange mb-2">
                          {prediction.nextBonus} спинов
                        </div>
                        <Badge className="bg-casino-electric text-black font-semibold">
                          Точность: {prediction.confidence}%
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-casino-navy rounded-lg border border-casino-gold/20">
                          <Icon name="TrendingUp" size={20} className="text-casino-gold mb-2" />
                          <p className="text-sm text-casino-gold/70">Паттерн</p>
                          <p className="font-orbitron text-casino-gold">{prediction.pattern}</p>
                        </div>
                        <div className="p-4 bg-casino-navy rounded-lg border border-casino-gold/20">
                          <Icon name="Lightbulb" size={20} className="text-casino-orange mb-2" />
                          <p className="text-sm text-casino-gold/70">Рекомендация</p>
                          <p className="font-orbitron text-casino-orange">{prediction.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-casino-gold/50">
                      <Icon name="ImageIcon" size={48} className="mx-auto mb-4" />
                      <p className="font-orbitron">Загрузите фото слота для анализа</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-casino-navy-light border-casino-gold/20 text-white">
              <CardHeader>
                <CardTitle className="font-orbitron text-casino-gold flex items-center">
                  <Icon name="Clock" size={24} className="mr-2" />
                  История анализов
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockHistory.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 bg-casino-navy rounded-lg border border-casino-gold/20">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-casino-gold/20 rounded-full flex items-center justify-center">
                          <Icon name="Target" size={20} className="text-casino-gold" />
                        </div>
                        <div>
                          <p className="font-orbitron text-casino-gold">{item.date}</p>
                          <p className="text-sm text-white/70">Предсказание: {item.prediction} спинов</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          className={`${
                            item.accuracy >= 90 
                              ? 'bg-green-500/20 text-green-400' 
                              : item.accuracy >= 80 
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {item.accuracy}% точность
                        </Badge>
                        <p className="text-sm text-white/70 mt-1">Факт: {item.actual}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-casino-navy-light border-casino-gold/20 text-white">
                <CardContent className="p-6 text-center">
                  <Icon name="Target" size={32} className="mx-auto mb-4 text-casino-gold" />
                  <h3 className="font-orbitron text-2xl font-bold text-casino-gold">89%</h3>
                  <p className="text-white/70">Средняя точность</p>
                </CardContent>
              </Card>
              
              <Card className="bg-casino-navy-light border-casino-gold/20 text-white">
                <CardContent className="p-6 text-center">
                  <Icon name="Camera" size={32} className="mx-auto mb-4 text-casino-orange" />
                  <h3 className="font-orbitron text-2xl font-bold text-casino-orange">142</h3>
                  <p className="text-white/70">Всего анализов</p>
                </CardContent>
              </Card>
              
              <Card className="bg-casino-navy-light border-casino-gold/20 text-white">
                <CardContent className="p-6 text-center">
                  <Icon name="Trophy" size={32} className="mx-auto mb-4 text-casino-electric" />
                  <h3 className="font-orbitron text-2xl font-bold text-casino-electric">23</h3>
                  <p className="text-white/70">Точных попаданий</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t border-casino-gold/20 bg-casino-navy/50 backdrop-blur-sm mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-casino-gold/70 font-orbitron">
            🚀 Powered by AI • Анализ слот-машин нового поколения
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;