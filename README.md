# 주요 설계

## 1. Context API + useMemo를 활용한 파생 상태 관리

상태 관리 라이브러리로 Jotai의 derived atom 대신 Context API와 `useMemo`를 선택했습니다.

```typescript
// 기본 상태
const [paymentData, setPaymentData] = useState(...);
const [filters, setFilters] = useState(...);

// 파생 상태 (useMemo)
const consumptionGroups = useMemo(() => {
  const filtered = filterConsumptions(paymentData.consumptions, filters);
  return groupConsumptions(filtered);
}, [paymentData, filters]);
```

- `useMemo` 의존성 배열로 "무엇이 변하면 재계산되는지" 명시적으로 확인할 수 있습니다.
- 데이터 페칭 → 필터링 → 그룹핑 흐름이 단일 Provider에 응집되어 전체 로직 파악 용이합니다.
- Jotai derived atom의 암묵적 의존성 추적은 현재 규모에서 과한 추상화라고 판단했습니다.
- 오히려 이 프로젝트에서 다루는 정도의 앱이라면 React Context Provider 로직이 좀 더 직관적으로 작성할 수 있다고 생각했습니다.
  - 다만, 다단계 필터링과 같이 파생 상태가 복잡해지는 요구사항이 발생하면 Jotai를 고려해 볼 만합니다.

## 2. 테이블 컴포넌트 영역별 분리

Ordered / Payable / Total 영역을 별도 컴포넌트로 분리했습니다.

- 영역별로 다른 범위의 렌더링 책임을 가집니다(그룹핑, 매핑, 집계 등의 상황을 고려)
- 영역별 스타일 변경 시 다른 영역에 영향을 미치지 않습니다.
- Payable의 경우 PaymentInfoTable, PaymentBreakdownTable 2개의 테이블로 구성됩니다.

## 3. 비즈니스 로직의 domain/utils 분리

그룹핑, 필터링 로직을 `domain/utils/payment.ts`로 분리했습니다.

- UI 컴포넌트와 데이터 처리 로직(PaymentContext)와 관심사를 분리하였습니다.
- 유지보수 관점을 고려할 때, 순수 함수로 작성하여 React Context와 종속되지 않고 독립적으로 동작할 수 있도록 고려했습니다.

# 트레이드 오프

- 본 범위에서는 서버 API 호출보다는 테이블 UI 구현 기능에 집중하였으므로 데이터 페칭과 관련된 추상화 작업을 모두 생략하였습니다.

# 요구 사항

## 목표

- [x] consumptions를 salesOrder.id 기준으로 그룹핑하고, 그룹별 Sub Total 표시
- [x] 컬럼별 검색 토글과 조건 선택으로 목록 필터링
- [x] payment, paymentBreakdowns와 consumptions 간 매핑 식별 가능하게 표시

## 상세

### Sub Total

- [x] consumption을 salesOrder.id로 그룹핑
- [x] 각 그룹 하단에 Sub Total 행으로 orderAmount 합계 표시

### 검색 (Search)

- [x] Search 토글 버튼 구현
- [x] Toggle ON 시 테이블 최상단에 검색 행 추가
- [x] 기본값 All, 각 컬럼의 후보는 consumption 고유값 집합
- [x] 선택 시 해당 조건과 일치하는 consumption만 표시
- [x] 다중 컬럼 동시 조건 AND 적용

# 프로젝트 구성

```
src/
├── main.tsx                    # 앱 진입점
├── App.tsx                     # 루트 컴포넌트
├── types.ts                    # 전역 타입 정의
├── Constant.ts                 # Mock 데이터
│
├── components/
│   ├── base/                   # 재사용 가능한 기본 컴포넌트
│   │   ├── Badge.tsx           # 상태 표시용 배지
│   │   ├── SelectBox.tsx       # 드롭다운 선택 컴포넌트
│   │   └── useSelectBox.ts     # SelectBox 로직 훅
│   │
│   └── PaymentTable/           # Payment 테이블 컴포넌트
│       ├── index.tsx               # 메인 테이블 레이아웃
│       ├── ConsumptionTable.tsx    # Ordered 섹션 (필터 + 그룹핑)
│       ├── PayableTable.tsx        # Payable 섹션 래퍼
│       ├── PaymentInfoTable.tsx    # 결제 메타 정보
│       ├── PaymentBreakdownTable.tsx   # Payment breakdown 매핑
│       ├── TotalTable.tsx          # 전체 합계
│       └── styles.ts               # 공통 스타일
│
├── context/
│   └── PaymentContext.tsx      # 전역 상태 관리 (필터, 데이터)
│
└── domain/
    └── utils/
        └── payment.ts          # 데이터 처리 유틸 (그룹핑, 필터링)
```

| 디렉토리                   | 역할                                      |
| -------------------------- | ----------------------------------------- |
| `components/base/`         | 범용 UI 컴포넌트 (Badge, SelectBox)       |
| `components/PaymentTable/` | Payment 테이블 관련 컴포넌트 집합         |
| `context/`                 | Context API 기반 전역 상태 관리           |
| `domain/utils/`            | 비즈니스 로직 (그룹핑, 필터링, 옵션 추출) |

# 실행 방법

## 환경

- Node.js: v22.13.1
- npm: 11.6.2

## 스크립트

```bash
# 의존성 설치 및 개발 서버 실행
npm run start

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```
