# Finepro Tools — Design System & UI Specification

> Tài liệu thiết kế tham chiếu cho ứng dụng **Finepro Tools** (Xử lý nhiệt).
> Mọi screen mới phải tuân thủ hệ thống thiết kế này.

---

## 1. Design Philosophy

| Principle                   | Description                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------- |
| **Clean & Professional**    | Giao diện sáng, tối giản, tập trung vào dữ liệu. Không trang trí thừa.                 |
| **Data-First**              | Nhiệt độ, trạng thái, thông số kỹ thuật luôn là tiêu điểm (font lớn, màu nổi bật).     |
| **Card-Based Layout**       | Mỗi nhóm thông tin nằm trong card riêng với `borderRadius.lg` (12px) và border subtle. |
| **Consistent Spacing**      | Sử dụng spacing tokens nhất quán: `p12`, `p16`, `p20`, `p24`.                          |
| **Accessible & Responsive** | Hỗ trợ dark mode, multi-language (EN/VI/ZH-CN/ZH-TW), responsive scaling.              |

---

## 2. Color Palette

### 2.1 Brand Colors

| Token             | Light     | Dark      | Usage                                                |
| ----------------- | --------- | --------- | ---------------------------------------------------- |
| `brand.primary`   | `#1447E6` | `#1447E6` | Primary actions, links, active states, selected tabs |
| `brand.secondary` | `#163587` | `#C7D7FF` | Secondary emphasis                                   |
| `brand.tertiary`  | `#FF9E3D` | `#FFB34D` | Accent, warnings                                     |
| `brand.onBrand`   | `#FFFFFF` | `#FFFFFF` | Text/icons on brand-colored surfaces                 |

### 2.2 Background Colors

| Token                   | Light     | Dark      | Usage                                    |
| ----------------------- | --------- | --------- | ---------------------------------------- |
| `background.app`        | `#F4F7FF` | `#08111F` | Root app background (tinted blue-gray)   |
| `background.surface`    | `#FFFFFF` | `#0D172A` | Cards, modals, inputs                    |
| `background.surfaceAlt` | `#EDF3FF` | `#12203A` | Alternating rows, subtle grouping        |
| `background.section`    | `#E3ECFF` | `#142848` | Section headers, segmented control track |
| `background.elevated`   | `#F8FAFF` | `#10203A` | Elevated surfaces (tab bar, floating)    |
| `background.input`      | `#F6F9FF` | `#162948` | Input field backgrounds                  |
| `background.disabled`   | `#D6E0F5` | `#0A1424` | Disabled elements                        |

### 2.3 Text Colors

| Token            | Light     | Dark      | Usage                       |
| ---------------- | --------- | --------- | --------------------------- |
| `text.primary`   | `#102A5C` | `#F5F9FF` | Headings, primary content   |
| `text.secondary` | `#415A8B` | `#C8D6F0` | Subheadings, labels         |
| `text.tertiary`  | `#6478A3` | `#92A8CC` | Descriptions, hints         |
| `text.muted`     | `#8A9ABB` | `#63789E` | Placeholders, disabled text |
| `text.link`      | `#1447E6` | `#7EA5FF` | Interactive links           |

### 2.4 State Colors

| Token             | Light                   | Dark                    | Semantic                                       |
| ----------------- | ----------------------- | ----------------------- | ---------------------------------------------- |
| `state.success`   | `#16A34A`               | `#4ADE80`               | ✅ Hoàn thành (Completed), Đang chạy (Running) |
| `state.successBg` | `rgba(22,163,74,0.12)`  | `rgba(74,222,128,0.18)` | Success badge background                       |
| `state.warning`   | `#FFB21D`               | `#FFD84C`               | ⚠️ Chờ (Waiting), Dừng sớm (Early stop)        |
| `state.warningBg` | `rgba(255,178,29,0.18)` | `rgba(255,216,76,0.2)`  | Warning badge background                       |
| `state.error`     | `#EF4444`               | `#F87171`               | 🔴 Lỗi (Error), dangerous actions              |
| `state.errorBg`   | `rgba(239,68,68,0.12)`  | `rgba(248,113,113,0.2)` | Error badge background                         |
| `state.info`      | `#3A86FF`               | `#60A5FA`               | ℹ️ Informational indicators                    |
| `state.infoBg`    | `rgba(58,134,255,0.14)` | `rgba(96,165,250,0.2)`  | Info badge background                          |

### 2.5 Border Colors

| Token            | Light     | Dark      | Usage                  |
| ---------------- | --------- | --------- | ---------------------- |
| `border.default` | `#CBD8F0` | `#21395E` | Card borders, dividers |
| `border.subtle`  | `#E6EEFB` | `#14233D` | Subtle separators      |
| `border.strong`  | `#9DB2DE` | `#3B568A` | Emphasized borders     |
| `border.focus`   | `#1447E6` | `#3B82F6` | Focus rings            |

### 2.6 Gradients

| Token                | Light               | Dark                | Usage                    |
| -------------------- | ------------------- | ------------------- | ------------------------ |
| `gradient.primary`   | `#193CB8 → #1447E6` | `#2E63F5 → #1447E6` | Primary gradient buttons |
| `gradient.secondary` | `#355FD6 → #7EA5FF` | `#4C7DFF → #2859B8` | Secondary gradients      |
| `gradient.success`   | `#1F8F4D → #16A34A` | `#14532D → #4ADE80` | Success accents          |
| `gradient.error`     | `#D13A3A → #F87171` | `#7F1D1D → #F87171` | Error/danger accents     |

---

## 3. Typography

### 3.1 Font Family

```
System (SF Pro on iOS, Roboto on Android)
```

Weights: `regular` (400), `medium` (500), `semibold` (600), `bold` (700)

### 3.2 Scale (responsive via `rf()`)

| Variant     | Base Size | Weight   | Usage                               |
| ----------- | --------- | -------- | ----------------------------------- |
| `h1`        | `rf(30)`  | bold     | Page titles (rarely used, reserved) |
| `h2`        | `rf(24)`  | bold     | Section headers                     |
| `h3`        | `rf(20)`  | semibold | Screen title in header, card titles |
| `body`      | `rf(16)`  | regular  | Default content text                |
| `bodySmall` | `rf(14)`  | regular  | Secondary content, list items       |
| `caption`   | `rf(12)`  | regular  | Timestamps, labels, meta info       |
| `label`     | `rf(14)`  | medium   | Form labels, chip labels            |
| `overline`  | `rf(10)`  | semibold | Category labels, overlines          |

### 3.3 Semantic Colors

```
primary | secondary | tertiary | muted | inverse | accent | link | onBrand
```

### 3.4 Temperature Display (Special Pattern)

Nhiệt độ lớn trên màn hình lò:

```
fontSize: rf(48) — rf(60)   // Variant: 5xl–6xl
fontWeight: bold
color: brand.primary (#1447E6)
```

Nhiệt độ nhỏ trong card dashboard:

```
fontSize: rf(24) — rf(30)   // Variant: 2xl–3xl
fontWeight: bold
color: brand.primary (#1447E6)
```

---

## 4. Spacing & Sizing

### 4.1 Spacing Scale (horizontal via `hs()`, vertical via `vs()`)

| Token | Value | Common Use                     |
| ----- | ----- | ------------------------------ |
| `p4`  | 4px   | Icon gaps, tight spacing       |
| `p8`  | 8px   | Inner padding, inline gaps     |
| `p12` | 12px  | Card inner padding, list gaps  |
| `p16` | 16px  | Standard padding, section gaps |
| `p20` | 20px  | Larger gaps between sections   |
| `p24` | 24px  | Section separators             |
| `p32` | 32px  | Major section breaks           |
| `p40` | 40px  | Action circle sizes            |
| `p44` | 44px  | Touch targets (min 44px)       |
| `p48` | 48px  | Large icon containers          |

### 4.2 Border Radius

| Token  | Value   | Usage                                     |
| ------ | ------- | ----------------------------------------- |
| `xs`   | `4px`   | Dot indicators                            |
| `sm`   | `6px`   | Small chips, subtle rounding              |
| `md`   | `8px`   | Buttons, inputs                           |
| `lg`   | `12px`  | Cards, modals                             |
| `xl`   | `16px`  | Large cards, bottom sheets                |
| `full` | `999px` | Circles, pills (badges, avatars, tab bar) |

### 4.3 Icon Sizes

| Token | Value  | Usage                           |
| ----- | ------ | ------------------------------- |
| `xs`  | `14px` | Inline small icons              |
| `sm`  | `16px` | Chip close, subtle icons        |
| `md`  | `18px` | Back button, default icon       |
| `lg`  | `20px` | Header actions, important icons |
| `xl`  | `24px` | Tab bar icons, hero icons       |

---

## 5. Shadow & Elevation

### Light Mode

```
shadowColor: rgba(16, 42, 92, 0.14)
shadowOffset: { width: 0, height: 4 }
shadowOpacity: 0.08
shadowRadius: 12
elevation: 2 (small) | 4 (medium) | 8 (large)
```

### Dark Mode

```
shadowColor: rgba(0, 0, 0, 0.5)
elevation: 2 (small) | 6 (medium) | 12 (large)
```

---

## 6. Component Library

### 6.1 Buttons

| Variant     | Background              | Text Color      | Border           | Usage                              |
| ----------- | ----------------------- | --------------- | ---------------- | ---------------------------------- |
| `primary`   | `brand.primary`         | `text.onBrand`  | none             | Main action (Tạo mẻ, Xuất báo cáo) |
| `secondary` | `background.surfaceAlt` | `text.primary`  | `border.default` | Secondary action                   |
| `outline`   | transparent             | `brand.primary` | `brand.primary`  | Tertiary action (Sửa)              |
| `ghost`     | transparent             | `brand.primary` | none             | Inline actions                     |
| `disabled`  | `background.disabled`   | `text.muted`    | none             | Disabled state                     |

**Sizes:** `sm` (32px height), `md` (44px height), `lg` (52px height)

**Danger buttons** (Tạm dừng, Dừng mẻ):

- Use `outline` variant with `state.error` color override
- Red border + red text + red icon (Pause/Stop icon on left)
- Both shown side-by-side at bottom of furnace detail

```tsx
// Example: Action button pair at bottom of furnace screen
<View style={{ flexDirection: 'row', gap: spacing.p12 }}>
  <Button
    title={t('furnace.pause')}
    variant="outline"
    leftIcon={<Icon icon={Pause} color={theme.colors.state.error} />}
    style={{ borderColor: theme.colors.state.error, flex: 1 }}
    labelStyle={{ color: theme.colors.state.error }}
  />
  <Button
    title={t('furnace.stop')}
    variant="outline"
    leftIcon={<Icon icon={Square} color={theme.colors.state.error} />}
    style={{ borderColor: theme.colors.state.error, flex: 1 }}
    labelStyle={{ color: theme.colors.state.error }}
  />
</View>
```

### 6.2 Cards

| Variant    | Background           | Border                 | Shadow       | Usage           |
| ---------- | -------------------- | ---------------------- | ------------ | --------------- |
| `filled`   | `background.surface` | `border.default` (1px) | none         | Default card    |
| `elevated` | `background.surface` | `border.subtle` (1px)  | small shadow | Dashboard cards |
| `outlined` | transparent          | `border.default` (1px) | none         | Subtle grouping |

**Card anatomy (Dashboard furnace card):**

```
┌────────────────────────────────────────────┐
│  ┌─Title─────────────────┐  ┌─Badge────┐  │
│  │ Máy 1 – Lò chân không │  │Đang chạy │  │
│  └───────────────────────┘  └──────────┘  │
│                                            │
│  ╔═ Temperature ═╗                         │
│  ║    721°C      ║   ┌─ Sparkline chart ─┐ │
│  ╚═══════════════╝   └──────────────────┘  │
│                                            │
│  Đặt: 600°C                               │
│  Bước 2/4                                  │
└────────────────────────────────────────────┘
```

- Corner radius: `borderRadius.lg` (12px)
- Padding: `spacing.p16`
- Gap between cards: `spacingV.p12`
- Left accent border (optional): 3px solid with gradient color per machine

### 6.3 Status Badges / Chips

Trạng thái mẻ (batch status) hiển thị dạng chip nhỏ ở góc trên phải card:

| Status     | Vietnamese | Color           | Background        |
| ---------- | ---------- | --------------- | ----------------- |
| Running    | Đang chạy  | `state.success` | `state.successBg` |
| Completed  | Hoàn thành | `state.success` | `state.successBg` |
| Waiting    | Chờ        | `state.warning` | `state.warningBg` |
| Early stop | Dừng sớm   | `state.warning` | `state.warningBg` |
| Error      | Lỗi        | `state.error`   | `state.errorBg`   |

**Badge implementation:**

```tsx
<Chip label={t('status.running')} variant="solid" size="sm" color={theme.colors.state.success} />
```

### 6.4 Segmented Control

Used for tab switching within a screen (e.g., Realtime | Thông số | Chi tiết).

- **Track background:** `background.section` (#E3ECFF light)
- **Active segment:** `background.surface` (white), with subtle shadow
- **Active text:** `brand.primary`, weight: `semibold`
- **Inactive text:** `text.secondary`, weight: `medium`
- **Border radius:** `borderRadius.md` (8px) for track, slightly smaller for segments
- **Height:** ~36px (size `md`)
- **Animated sliding indicator**

```tsx
<SegmentedControl
  value={activeTab}
  onChange={setActiveTab}
  options={[
    { label: t('furnace.realtime'), value: 'realtime' },
    { label: t('furnace.params'), value: 'params' },
    { label: t('furnace.details'), value: 'details' },
  ]}
  size="md"
/>
```

### 6.5 Input / FormField

- Background: `background.input` (#F6F9FF)
- Border: `border.default` (1px), focus → `border.focus`
- Border radius: `borderRadius.md` (8px)
- Height: 44–48px
- Label above in `caption` or `label` variant
- Padding: `p12` horizontal

### 6.6 Select (Dropdown)

- Trigger looks like an Input with chevron-down icon
- Opens a bottom sheet or dropdown with options
- Selected value shown in trigger

### 6.7 SearchBar

- Full-width with search icon on left
- Background: `background.input`
- Border radius: `borderRadius.md`
- Placeholder: `text.muted`
- Right side: optional filter icon button

### 6.8 ListItem (Mẻ List Item)

```
┌──────────────────────────────────────────────┐
│  M240522-0007                    ┌─────────┐ │
│  Máy 1 – Lò chân không          │Hoàn thành│ │
│  13:41 – 14:21 (00:40)          └─────────┘ │
└──────────────────────────────────────────────┘
```

- Title: `body` weight `semibold`, color `text.primary`
- Subtitle: `bodySmall`, color `text.secondary`
- Time: `caption`, color `text.tertiary`
- Status chip aligned right
- Divider between items: `border.subtle` (1px)
- Vertical padding: `spacingV.p12`

### 6.9 TabBar (Bottom Navigation)

- **Style:** Floating pill at bottom center
- **Background:** `background.surface` with blur effect
- **Border:** `border.subtle` (1px), `borderRadius.full`
- **Shadow:** medium elevation
- **Margin bottom:** `safeAreaInsets.bottom + vs(8)`
- **Active indicator:** Animated sliding pill behind active tab
- **Active icon/label:** `brand.primary`
- **Inactive icon/label:** `text.primary` (opacity 0.82)
- **Tab icons:** Lucide icons at 22px, strokeWidth 2.1

Tabs defined:
| Tab | Icon | Label (vi) |
|---|---|---|
| Dashboard | `House` | Tổng quan |
| Furnace | `Thermometer` | Giám sát |
| Alerts | `TriangleAlert` | Cảnh báo |

### 6.10 AppHeader (Top Navigation)

**Dashboard/Home header:**

- Left: Brand logo + "finepro" + "AUTOMATION" tagline
- Right: Notification bell (with red badge count) + Language flag selector
- All action items in 40×40px circles with `border.subtle` border

**Sub-page header:**

- Left: Back button (44×44px circle, `border.default`, chevron-left icon)
- Center-left: Page title in `h3` `semibold`
- Right: Same notification + language actions

---

## 7. Screen Patterns

### 7.1 Tổng quan (Dashboard Overview)

```
┌─ AppHeader ──────────────────────────────────┐
│ [Logo] finepro AUTOMATION   [🔔] [🇻🇳]     │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─ Furnace Card 1 ───────────────────────┐  │
│  │ Máy 1 – Lò chân không    [Đang chạy]  │  │
│  │                                        │  │
│  │  721°C              📈 sparkline       │  │
│  │  Đặt: 600°C                            │  │
│  │  Bước 2/4                              │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌─ Furnace Card 2 ───────────────────────┐  │
│  │ Máy 2 – Buồng khí        [Đang chạy]  │  │
│  │                                        │  │
│  │  645°C                                 │  │
│  │  Đặt: 720°C                            │  │
│  │  Bước 1/3                              │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌─ Furnace Card 3 ───────────────────────┐  │
│  │ Máy 3 – Lò tôi dầu           [Chờ]    │  │
│  │                                        │  │
│  │  28°C                                  │  │
│  │  Đặt: 0°C                             │  │
│  │  Chưa có mẻ                            │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌─ Furnace Card 4 ───────────────────────┐  │
│  │ Máy 4 – Lò ram             [Đang]     │  │
│  │                                        │  │
│  │  36°C                                  │  │
│  │  Đặt: 0°C                             │  │
│  │  Chưa có mẻ                            │  │
│  └────────────────────────────────────────┘  │
│                                              │
├─ Floating TabBar ────────────────────────────┤
│    [🏠 Tổng quan] [🌡 Giám sát] [⚠ Cảnh báo]│
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Cards stack vertically with `spacingV.p12` gap
- Each card has subtle left-side gradient accent
- Temperature in large blue bold font
- Sparkline chart (mini line graph) appears on running furnaces
- Status chip in top-right corner of each card
- Scroll enabled via `ScreenContainer scrollable padded`

### 7.2 Furnace Detail (Máy 1 – Lò chân không)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Máy 1 – Lò chân không   [🔔] [🇻🇳]    │
├──────────────────────────────────────────────┤
│                                              │
│  ┌ SegmentedControl ─────────────────────┐   │
│  │ [Realtime] │ Thông số │ Chi tiết      │   │
│  └───────────────────────────────────────┘   │
│                                              │
│           ╔══════════╗                       │
│           ║  721°C   ║  ← Large blue temp    │
│           ╚══════════╝                       │
│       Nhiệt độ đặt: 800°C                   │
│                                              │
│  ┌─ Info Row ────────────────────────────┐   │
│  │  Mẻ            Bước        Thời gian  │   │
│  │  M240522-0007  2/4         00:38:52   │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ● Thực tế  ○ Bật (dashed)                  │
│                                              │
│  ┌─ Temperature Chart ───────────────────┐   │
│  │  1000                                 │   │
│  │                          ----800----  │   │
│  │   800  ╱                /             │   │
│  │       /                /              │   │
│  │   600╱────────────────                │   │
│  │     /                                 │   │
│  │   200                                 │   │
│  │     0                                 │   │
│  │    13:40  14:00  14:20  14:32         │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌─ Actions ─────────────────────────────┐   │
│  │  [🔴 Tạm dừng]    [🔴 Dừng mẻ]       │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Temperature display: `fontSize.5xl` (~48px), bold, `brand.primary` color
- "Nhiệt độ đặt: 800°C" in `bodySmall`, `text.secondary`
- Info row: 3 columns (Mẻ, Bước, Thời gian) in card with `background.surfaceAlt`
- Chart: Blue solid line (actual) + Red dashed line (set point)
- Legend: dot indicators (● blue, ○ red dashed)
- Bottom action: Two red outline buttons side-by-side

### 7.3 Tạo mẻ mới (Create New Batch)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Tạo mẻ mới              [🔔] [🇻🇳]    │
├──────────────────────────────────────────────┤
│                                              │
│  Máy                                         │
│  ┌─ Select ──────────────────────────────┐   │
│  │ Máy 1 – Lò chân không            [▼] │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ── Thông tin mẻ ─────────────────────────   │
│                                              │
│  Số mẻ (tự động)       M240522-0008         │
│  Sản phẩm              [                ]    │
│  Vật liệu              SUS304 / SUS31A      │
│  Số lượng (pcs)         3550                 │
│  Đường kính (ø)         ø550                 │
│  Khách hàng             Công ty ABC          │
│  Đơn hàng               [                ]   │
│                                              │
│  Ghi chú                                     │
│  ┌──────────────────────────────────────┐    │
│  │ Nhập ghi chú (nếu có)               │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ── Chương trình xử lý ──────────────────    │
│                                              │
│  Chọn chương trình                           │
│  ┌──────────────────────────────────────┐    │
│  │ SF1-L4-U2-2 ELBOW 90° 38°       [>] │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌─────────────────────────────────────┐     │
│  │            [ Tạo mẻ ]               │     │
│  └─────────────────────────────────────┘     │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Section headers: `h3` weight `semibold`, `text.primary`
- Form uses `FormField` + `Input` components
- Some fields are read-only (auto-generated batch number)
- Select fields have chevron-right icon for drill-down
- TextArea for notes with placeholder
- Primary button "Tạo mẻ" at bottom, full width

### 7.4 Chi tiết mẻ (Batch Detail)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Chi tiết mẻ             [🔔] [🇻🇳]    │
├──────────────────────────────────────────────┤
│                                              │
│  [Hoàn thành]  M240522-0007                  │
│                                              │
│  ┌ SegmentedControl ─────────────────────┐   │
│  │ [Tổng quan] │ Biểu đồ │ Thông số │   │   │
│  │             │          │ Nhật ký  │   │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ── Thông tin mẻ ─────────────────────────   │
│                                              │
│  Máy          Máy 1 – Lò chân không         │
│  Chương trình SF1-L4-U2-2 ELBOW 90° 38°     │
│  Bắt đầu     22/05/2024 13:41:25            │
│  Kết thúc    22/05/2024 14:21:36             │
│  Thời gian   00:40:11                        │
│  Số lượng    3550 pcs                        │
│  Vật liệu    SUS304 / SUS31A                │
│  Khách hàng  Công ty ABC                     │
│  Ghi chú     —                               │
│  Người tạo   Nguyễn Văn A                    │
│                                              │
│  ┌─ Actions ─────────────────────────────┐   │
│  │  [✏ Sửa]          [📄 Xuất báo cáo]   │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Status chip + Batch ID at top (e.g., `[Hoàn thành] M240522-0007`)
- 4-tab SegmentedControl
- Info displayed as label-value pairs (table-like, 2-column layout)
- Label: `bodySmall`, `text.secondary` | Value: `body`, `text.primary`
- Bottom actions: "Sửa" (outline button with edit icon) + "Xuất báo cáo" (primary button with document icon)

### 7.5 Danh sách mẻ (Batch List)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Danh sách mẻ      [🔔] [🇻🇳] [🔍/⚙]  │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─ SearchBar ───────────────────────────┐   │
│  │ 🔍 Tìm kiếm số mẻ, sản phẩm...      │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  [Tất cả máy ▼]  [Hôm nay ▼]                │
│                                              │
│  ┌─ List Item ───────────────────────────┐   │
│  │ M240522-0007              [Hoàn thành]│   │
│  │ Máy 1 – Lò chân không                │   │
│  │ 13:41 – 14:21 (00:40)                │   │
│  ├───────────────────────────────────────┤   │
│  │ M240522-0006              [Đang chạy] │   │
│  │ Máy 2 – Buồng khí                    │   │
│  │ 13:10 – ... (00:38)                  │   │
│  ├───────────────────────────────────────┤   │
│  │ M240522-0005              [Dừng sớm] │   │
│  │ Máy 4 – Lò ram                       │   │
│  │ 11:20 – 11:45 (00:25)               │   │
│  ├───────────────────────────────────────┤   │
│  │ ...                                   │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ┌─ FAB ─────────────────────────────────┐   │
│  │       [+ Tạo mẻ mới]                 │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- SearchBar at top with filter icon
- Filter chips row: "Tất cả máy" and "Hôm nay" as outline chips with dropdown
- FlatList of batch items with dividers
- Each item: batch ID (bold), machine name, time range
- Status chip right-aligned
- Bottom: Primary full-width button "Tạo mẻ mới" with + icon

---

### 7.6 Đăng nhập (Login)

```
┌─ AppHeader ──────────────────────────────────┐
│ [Logo] finepro AUTOMATION         [🇻🇳]       │
├──────────────────────────────────────────────┤
│                                              │
│         ┌────────────────────────┐           │
│         │      Login Banner      │           │
│         │   (Hình minh họa lò)    │           │
│         └────────────────────────┘           │
│                                              │
│   ┌─ Form Panel ─────────────────────────┐   │
│   │  Đăng nhập                           │   │
│   │  Nhập tài khoản để tiếp tục          │   │
│   │                                      │   │
│   │  Tên đăng nhập                       │   │
│   │  ┌────────────────────────────────┐  │   │
│   │  │ 👤 Nhập tài khoản              │  │   │
│   │  └────────────────────────────────┘  │   │
│   │  Mật khẩu                            │   │
│   │  ┌────────────────────────────────┐  │   │
│   │  │ 🔒 Nhập mật khẩu               │  │   │
│   │  └────────────────────────────────┘  │   │
│   │                                      │   │
│   │  ┌────────────────────────────────┐  │   │
│   │  │          [ Đăng nhập ]         │  │   │
│   │  └────────────────────────────────┘  │   │
│   └──────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Header chỉ hiển thị nút đổi Ngôn ngữ và lựa chọn API Base Url (Finepro/Vcast), không có chuông thông báo hay menu.
- Banner hình ảnh lò nhiệt được bo góc nhẹ, hiển thị căn giữa ở nửa trên.
- Form Panel dạng card nổi (`background.surface`), viền tinh tế, bóng đổ lớn (`shadowOpacity: 0.12`).
- Inputs sử dụng icons bên trái (👤 User, 🔒 Lock) và placeholder màu `text.muted`.
- Nút bấm "Đăng nhập" lớn, màu primary nổi bật.

---

### 7.7 Tài khoản (Account / Profile)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Tài khoản               [🔔] [🇻🇳]        │
├──────────────────────────────────────────────┤
│                                              │
│  ┌─ Profile Header ──────────────────────┐   │
│  │     ┌──┐                              │   │
│  │     │KV│  Kỹ thuật viên               │   │
│  │     └──┘  admin@finepro.vn            │   │
│  │                                       │   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ── Thông tin cá nhân ────────────────────   │
│                                              │
│  Họ và tên     Nguyễn Văn A                  │
│  Tên truy cập  admin                         │
│  Vai trò       Kỹ thuật viên vận hành        │
│  Bộ phận       Vận hành Lò tôi               │
│                                              │
│  ── Bảo mật & Tài khoản ──────────────────   │
│                                              │
│  ┌─ List Item ───────────────────────────┐   │
│  │ 🔒 Đổi mật khẩu                    [>]│   │
│  ├───────────────────────────────────────┤   │
│  │ 📱 Thiết bị liên kết               [>]│   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Header trang có nút quay lại (`chevron-left`) dạng hình tròn cổ điển.
- Profile Header dạng card chứa Avatar lớn, hiển thị chữ cái đầu tên viết hoa (`KV`).
- Thông tin dạng bảng 2 cột rõ ràng, nhãn bên trái màu `text.secondary`, giá trị bên phải màu `text.primary` đậm.
- Danh sách liên kết bảo mật sử dụng `ListItem` với icon mũi tên sang phải `[>]`.

---

### 7.8 Cài đặt chung (Settings)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Cài đặt chung           [🔔] [🇻🇳]        │
├──────────────────────────────────────────────┤
│                                              │
│  ── Giao diện & Ngôn ngữ ─────────────────   │
│                                              │
│  Giao diện tối (Dark Mode)                   │
│  ┌─ Item Row ────────────────────────────┐   │
│  │ 🌙 Kích hoạt chế độ tối       [Toggle]│   │
│  └───────────────────────────────────────┘   │
│                                              │
│  Ngôn ngữ ứng dụng                           │
│  ┌─ Select ──────────────────────────────┐   │
│  │ 🇻🇳 Tiếng Việt                      [▼]│   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ── Kết nối máy chủ ──────────────────────   │
│                                              │
│  API Base URL                                │
│  ┌─ Select ──────────────────────────────┐   │
│  │ 🏢 Hệ thống Finepro (Mặc định)     [▼]│   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Điều khiển bật/tắt (Dark Mode Toggle) sử dụng component `Switch` chuẩn hóa.
- Menu chọn Ngôn ngữ và API Base URL sử dụng component `Select` kèm icon cờ quốc gia hoặc logo hãng.

---

### 7.9 Cài đặt cảnh báo (Alert Settings)

```
┌─ AppHeader ──────────────────────────────────┐
│ [←] Cài đặt cảnh báo        [🔔] [🇻🇳]        │
├──────────────────────────────────────────────┤
│                                              │
│  ── Phương thức nhận cảnh báo ────────────   │
│                                              │
│  Âm thanh thông báo sự cố                    │
│  ┌─ Item Row ────────────────────────────┐   │
│  │ 🔊 Phát âm thanh lớn (Critical) [Toggle]│   │
│  └───────────────────────────────────────┘   │
│                                              │
│  Thông báo đẩy (Push)                        │
│  ┌─ Item Row ────────────────────────────┐   │
│  │ 💬 Gửi thông báo đến thiết bị   [Toggle]│   │
│  └───────────────────────────────────────┘   │
│                                              │
│  Chế độ rung                                 │
│  ┌─ Item Row ────────────────────────────┐   │
│  │ 📳 Rung khi có sự cố lò        [Toggle]│   │
│  └───────────────────────────────────────┘   │
│                                              │
│  ── Dữ liệu & Lưu trữ ────────────────────   │
│                                              │
│  Lịch sử sự cố                               │
│  ┌─ Red Outline Button ──────────────────┐   │
│  │          [ 🗑 Xóa lịch sử sự cố ]       │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Thiết lập nhận thông báo sử dụng các hàng `Switch` được sắp xếp gọn gàng.
- Phần Xóa dữ liệu sự cố sử dụng Nút viền đỏ chữ đỏ (`variant="outline"`, màu `state.error`) nhằm cảnh báo người dùng.
- Khi bấm nút Xóa lịch sử sẽ kích hoạt hộp thoại `Dialog` xác nhận 2 lựa chọn (Hủy | Đồng ý).

---

### 7.10 Danh sách & Chi tiết cảnh báo (Alerts)

```
┌─ AppHeader ──────────────────────────────────┐
│ Danh sách cảnh báo          [🔔] [🇻🇳]        │
├──────────────────────────────────────────────┤
│                                              │
│  [Tất cả mức ▼]  [Chưa xử lý ▼]              │
│                                              │
│  ┌─ Alert Item 1 ────────────────────────┐   │
│  │ 🔴 Quá nhiệt lò nung (920°C)          │   │
│  │ Lò chân không – Máy 1                 │   │
│  │ 15:40:12 – Chưa xử lý                 │   │
│  ├───────────────────────────────────────┤   │
│  │ 🟡 Mất kết nối cảm biến nhiệt độ      │   │
│  │ Buồng khí – Máy 2                     │   │
│  │ 14:15:30 – Đã xử lý (14:32)           │   │
│  ├───────────────────────────────────────┤   │
│  │ ...                                   │   │
│  └───────────────────────────────────────┘   │
│                                              │
└──────────────────────────────────────────────┘
```

**Key visual traits:**

- Sử dụng màu sắc chỉ báo mức độ lỗi: đỏ `🔴` (`state.error`) cho lỗi nguy hiểm (Critical), vàng `🟡` (`state.warning`) cho cảnh báo thường (Warning).
- Trong trang Chi tiết cảnh báo, thông số kỹ thuật (lò, thời gian, mô tả lỗi, cách khắc phục đề xuất) hiển thị dưới dạng các thẻ `Card` thông tin và có nút bấm xác nhận xử lý sự cố.

---

## 8. Chart Specifications

### 8.1 Temperature Line Chart

**Library recommendation:** `react-native-gifted-charts` or `victory-native`

| Element                 | Style                                                     |
| ----------------------- | --------------------------------------------------------- |
| Actual temperature line | Solid, `brand.primary` (#1447E6), width 2px               |
| Set temperature line    | Dashed, `state.error` (#EF4444), width 1.5px, dash [6, 4] |
| Y-axis labels           | `caption`, `text.muted`, left-aligned                     |
| X-axis labels           | `caption`, `text.muted`, time format HH:mm                |
| Grid lines              | `border.subtle`, 0.5px, horizontal only                   |
| Chart background        | `background.surface`                                      |
| Legend                  | Dot + label above chart area                              |

### 8.2 Sparkline (Mini Chart in Dashboard Card)

- Height: ~40–50px
- Width: ~100px (right side of card)
- Line color: `state.success` for running, `text.muted` for idle
- No axes, no labels
- Fill area below with 10% opacity gradient

---

## 9. Animation & Interaction

| Pattern            | Implementation                                             |
| ------------------ | ---------------------------------------------------------- |
| Button press       | `useAnimatedPress()` — scale to 0.96 with spring           |
| Card press         | `useAnimatedPress({ scale: 0.98 })`                        |
| Tab switch         | `withSpring` sliding indicator (damping 18, stiffness 180) |
| Segmented control  | Animated sliding background with `withSpring`              |
| Tab bar icon       | `withTiming` color interpolation, 220ms                    |
| Screen transitions | expo-router default (slide from right on iOS)              |
| Pull to refresh    | React Query's `refetch` on pull                            |
| Skeleton loading   | Shimmer animation via `Skeleton` component                 |

---

## 10. Responsive Breakpoints

| Breakpoint | Width      | Behavior                        |
| ---------- | ---------- | ------------------------------- |
| `xs`       | 0–575px    | Phone portrait (primary target) |
| `sm`       | 576–767px  | Large phone / small tablet      |
| `md`       | 768–991px  | Tablet portrait                 |
| `lg`       | 992–1199px | Tablet landscape                |
| `xl`       | 1200px+    | Large tablet / web              |

**Responsive scaling:**

- `rf(size)` → responsive font scaling (capped at 430px width)
- `hs(size)` → horizontal spacing (capped at 430px width)
- `vs(size)` → vertical spacing (capped at 932px height)
- Header max-width: 960px on tablet

---

## 11. Dark Mode Considerations

All colors transition automatically via `react-native-unistyles` theme switching.

Key differences:

- Background shifts from light blue-tinted whites to deep navy/slate
- Cards become slightly lighter navy (`#0D172A`)
- Text inverts to light colors
- State colors brighten for contrast on dark surfaces
- Shadows deepen and use black base
- Border colors shift to darker blue-grays

---

## 12. Accessibility

| Requirement      | Implementation                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------- |
| Touch targets    | Minimum 44×44px for all interactive elements                                                |
| Focus indicators | `border.focus` ring on focus                                                                |
| Screen reader    | `accessibilityRole`, `accessibilityLabel`, `accessibilityState` on all interactive elements |
| Color contrast   | WCAG AA minimum (4.5:1 text, 3:1 large text)                                                |
| Reduced motion   | Respect `prefers-reduced-motion` in animations                                              |
| RTL support      | Standard React Native RTL via `I18nManager`                                                 |

---

## 13. i18n Patterns

All UI strings use `react-i18next`:

```tsx
const { t } = useTranslation();
<Text>{t('furnace.temperature')}</Text>;
```

**Supported languages:**

- 🇺🇸 English (`en`)
- 🇻🇳 Vietnamese (`vi`) — Primary
- 🇨🇳 Simplified Chinese (`zh-CN`)
- 🇹🇼 Traditional Chinese (`zh-TW`)

Number/date formatting should respect locale.

---

## 14. Implementation Checklist for New Screens

- [ ] Use `ScreenContainer` as root with `scrollable` and `padded` props
- [ ] Use `AppHeader` for navigation (auto-configured by layout)
- [ ] Use `Card` component for content grouping, variant `filled` or `elevated`
- [ ] All text via `Text` component with appropriate `variant`
- [ ] All colors from `theme.colors.*` — never hardcode
- [ ] All spacing from `theme.metrics.spacing.*` / `spacingV.*`
- [ ] All strings via `t()` — update all 4 locale files
- [ ] All interactive elements have `accessibilityRole` + `accessibilityLabel`
- [ ] Status indicators use `Chip` component with semantic colors
- [ ] Forms use `FormField` + `Input` + `zod/v4` validation
- [ ] Loading states use `Skeleton` or `Loading` component
- [ ] Empty states use `EmptyState` component
- [ ] Error states use `ErrorBoundary` + retry actions
- [ ] Styles via `StyleSheet.create((theme) => ({}))` from `react-native-unistyles`
- [ ] Run `yarn validate` before committing
