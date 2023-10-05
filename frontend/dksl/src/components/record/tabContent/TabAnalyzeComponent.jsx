// React
import { useEffect, useState } from 'react';
// Axios
import axios from 'axios';
// Styled
import * as S from '@/styles/record/tabanalyze.style';
// Chart
import { ResponsiveRadar } from '@nivo/radar';
import LoadingComponent from '../../common/LoadingComponent';

const data = [
  {
    taste: 'fruity',
    carmenere1: 120,
    carmenere2: 60,
    carmenere3: 90,
    carmenere4: 50,
  },
  {
    taste: 'bitter',
    carmenere1: 35,
    carmenere2: 80,
    carmenere3: 20,
    carmenere4: 100,
  },
  {
    taste: 'heavy',
    carmenere1: 20,
    carmenere2: 30,
    carmenere3: 50,
    carmenere4: 40,
  },
  {
    taste: 'strong',
    carmenere1: 80,
    carmenere2: 2,
    carmenere3: 70,
    carmenere4: 40,
  },
];

const TabAnalyzeComponent = () => {
  const [champ, setChamp] = useState(null);

  useEffect(() => {
    const arr = ['Zed', 'Aatrox', 'Yasuo'];

    const fetchData = async (championName) => {
      try {
        const response = await axios.get(`https://ddragon.leagueoflegends.com/cdn/10.6.1/data/ko_KR/champion/${championName}.json`);
        const data = response.data.data[championName];
        return {
          en_name: championName,
          name: data.name,
          title: data.title,
          tags: data.tags,
          tips: data.allytips,
        };
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        return null;
      }
    };

    const fetchChampionData = async () => {
      const newArr = [];

      for (const championName of arr) {
        const championData = await fetchData(championName);
        if (championData) {
          newArr.push(championData);
        }
      }

      setChamp(newArr);
    };

    // champ가 null일 때만 데이터 가져오기
    if (champ === null) {
      fetchChampionData();
    }
  }, [champ]);

  return ( 
    <S.TabAnalyzeLayout>
      <S.LeftLayout>
        <S.AnalyzeCard>
          <p className="title">&#128195; 롤BTI 분석</p>
          <div className="analyze-box">
            <img src="/image/lbti-img.svg" />
            <div className="subtitle">
              <p>킹받는 티모 원챔</p>
              <p className="lbti">CVSD</p>
            </div>
            <div className="tag-box">
              <S.TagItem $bg="red">
                <div className="text">
                  #<b>공격</b>적인
                </div>
              </S.TagItem>
              <S.TagItem $bg="green">
                <div className="text">
                  #<b>올드</b>한
                </div>
              </S.TagItem>
              <S.TagItem $bg="violet">
                <div className="text">
                  #많이<b>때린</b>
                </div>
              </S.TagItem>
              <S.TagItem $bg="var(--maincolor-depth1)">
                <div className="text">
                  #<b>철거</b>반장
                </div>
              </S.TagItem>
            </div>
          </div>
        </S.AnalyzeCard>
        <S.GraphCard>
          <p className="title">&#128195; 롤BTI 그래프</p>
          <div className="graph-box">
            <ResponsiveRadar
              data={data}
              keys={['carmenere1', 'carmenere2', 'carmenere3', 'carmenere4']}
              indexBy="taste"
              valueFormat=">-.2f"
              margin={{ top: -40, right: 80, bottom: 0, left: 80 }}
              borderColor={{ from: 'color' }}
              gridLevels={4}
              gridShape="linear"
              gridLabelOffset={36}
              dotSize={10}
              dotColor={{ theme: 'background' }}
              dotBorderWidth={2}
              colors={{ scheme: 'nivo' }}
              blendMode="multiply"
              motionConfig="wobbly"
              legends={[
                {
                  anchor: 'top-left',
                  direction: 'column',
                  translateX: -50,
                  translateY: -40,
                  itemWidth: 80,
                  itemHeight: 20,
                  itemTextColor: '#999',
                  symbolSize: 12,
                  symbolShape: 'circle',
                  effects: [
                    {
                      on: 'hover',
                      style: {
                        itemTextColor: '#000',
                      },
                    },
                  ],
                },
              ]}
            />
          </div>
        </S.GraphCard>
      </S.LeftLayout>
      <S.RightLayout>
        <S.ChampionCard>
          <p className="title">&#128077; 이 챔피언을 추천해요!</p>
          <div className="champion-box">
            {champ ? (
              champ.map((e, i) => (
                <div className="container" key={`champion_card_${i}`}>
                  <div
                    className="card front"
                    style={{
                      backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${e.en_name}_0.jpg)`,
                    }}
                  ></div>
                  <div className="card back">
                    <div className="name">{e.name}</div>
                    <p className="tags">{e.tags.map((v, j) => {
                      if (j == e.tags.length - 1) return v;
                      else return v+', ';
                    })}</p>
                    <p className="tips">{e.tips[Math.floor(Math.random() * e.tips.length)]}</p>
                  </div>
                </div>
              ))
            ) : (
              <LoadingComponent />
            )}
          </div>
        </S.ChampionCard>
        <S.FamousCard>
          <p className="title">&#128071; 이 사람은 어때요?</p>
          <div className="content-box">
            <div className="img">
              <img src="/image/lbti-img.svg" alt="sample_img" />
            </div>
          </div>
        </S.FamousCard>
      </S.RightLayout>
    </S.TabAnalyzeLayout>
  );
};

export default TabAnalyzeComponent;
