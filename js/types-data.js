// ===== 보이스피싱 유형 데이터 =====
// image: 해당 유형의 원본 디자인 이미지
// desc: 설명 듣기 음성 / real: 실제 피싱범 목소리 음성 (없는 유형은 생략)
const PHISHING_TYPES = [
  {
    id: 'institution',
    title: '기관사칭형',
    image: 'assets/screens/type-institution.png',
    desc: 'assets/audio/institution-desc.mp3',
    real: 'assets/audio/institution-real.mp3'
  },
  {
    id: 'loan',
    title: '대출빙자',
    image: 'assets/screens/type-loan.png',
    desc: 'assets/audio/loan-desc.mp3',
    real: 'assets/audio/loan-real.mp3'
  },
  {
    id: 'kidnap',
    title: '납치빙자',
    image: 'assets/screens/type-kidnap.png',
    desc: 'assets/audio/kidnap-desc.mp3',
    real: 'assets/audio/kidnap-real.mp3'
  },
  {
    id: 'acquaintance',
    title: '지인사칭',
    image: 'assets/screens/type-acquaintance.png',
    desc: 'assets/audio/acquaintance-desc.mp3'
  },
  {
    id: 'noshow',
    title: '노쇼사기',
    image: 'assets/screens/type-noshow.png',
    desc: 'assets/audio/noshow-desc.mp3'
  },
  {
    id: 'investment',
    title: '투자리딩방',
    image: 'assets/screens/type-investment.png',
    desc: 'assets/audio/investment-desc.mp3'
  },
  {
    id: 'teammission',
    title: '팀미션사기',
    image: 'assets/screens/type-teammission.png',
    desc: 'assets/audio/teammission-desc.mp3'
  },
  {
    id: 'romance',
    title: '로맨스스캠',
    image: 'assets/screens/type-romance.png',
    desc: 'assets/audio/romance-desc.mp3'
  },
  {
    id: 'smishing',
    title: '스미싱',
    image: 'assets/screens/type-smishing.png',
    desc: 'assets/audio/smishing-desc.mp3'
  }
];

// 원본 디자인 기준(크롭 후 402x550) 버튼 위치 - % 값
const HOTSPOT_TWO_BTN = {
  desc: 'left:8.46%;top:26.36%;width:83.58%;height:28.18%',
  real: 'left:7.96%;top:57.82%;width:84.08%;height:27.64%'
};
const HOTSPOT_ONE_BTN = {
  desc: 'left:8.46%;top:26.36%;width:83.58%;height:59.82%'
};
