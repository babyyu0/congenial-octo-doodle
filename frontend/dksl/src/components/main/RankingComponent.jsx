// Styled
import * as S from '../../styles/main/ranking.style';
// Component
import LoadingComponent from '../common/LoadingComponent';

/**
 * @param props // 탭 상태 저장할, 변경할 hotTab, rankTab 받아올 프롭스 객체
 */
const RankingComponent = (props) => {
  // const arr
  return (
    <S.RankingLayout>
      <div className="container">
        <p className="title">&#127942; 명예의 전당</p>
        <S.TabBox>
          <S.TabItem
            istab={props.hofTab == 0 ? 1 : 0}
            onClick={() => props.setHofTab(0)}
          >
            일간
          </S.TabItem>
          <S.TabItem
            istab={props.hofTab == 1 ? 1 : 0}
            onClick={() => props.setHofTab(1)}
          >
            주간
          </S.TabItem>
          <S.TabItem
            istab={props.hofTab == 2 ? 1 : 0}
            onClick={() => props.setHofTab(2)}
          >
            월간
          </S.TabItem>
        </S.TabBox>
        {props.hofData ? (
          <S.ContentTable>
            <S.ContentItem>
              <p className="idx">1</p>
              <img className="image" src="image/dkslhead.svg" />
              <p className="name">닉네임</p>
              <p className="tier">Challenger</p>
            </S.ContentItem>
            <S.ContentItem>
              <p className="idx">1</p>
              <img className="image" src="image/dkslhead.svg" />
              <p className="name">닉네임</p>
              <p className="tier">Challenger</p>
            </S.ContentItem>
          </S.ContentTable>
        ) : (
          <S.ContentTable>
            <LoadingComponent />
          </S.ContentTable>
        )}
      </div>
      <div className="container">
        <p className="title">&#127969; 소속 별 순위</p>
        <S.TabBox>
          <S.TabItem
            istab={props.rankTab == 0 ? 1 : 0}
            onClick={() => props.setRankTab(0)}
          >
            랭킹
          </S.TabItem>
          <S.TabItem
            istab={props.rankTab == 1 ? 1 : 0}
            onClick={() => props.setRankTab(1)}
          >
            최다플레이
          </S.TabItem>
          <S.TabItem
            istab={props.rankTab == 2 ? 1 : 0}
            onClick={() => props.setRankTab(2)}
          >
            내 순위
          </S.TabItem>
        </S.TabBox>
        {props.rankData ? (
          <S.ContentTable>
            <S.ContentItem>
              <p className="idx">1</p>
              <img className="image" src="image/dkslhead.svg" />
              <p className="name">닉네임</p>
              <p className="tier">Challenger</p>
            </S.ContentItem>
          </S.ContentTable>
        ) : (
          <S.ContentTable>
            <LoadingComponent />
          </S.ContentTable>
        )}
      </div>
    </S.RankingLayout>
  );
};

export default RankingComponent;
