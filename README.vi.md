# Tech Video Studio (`tech-video-studio` v2.0 — Phiên bản chuẩn ByteByteGo)

> **Thư viện Đồ họa Chuyển động (Motion Graphics Engine) & Bộ Kỹ năng AI (AI Skill Kit) giúp tạo video giải thích kỹ thuật / System Design chuẩn 1080p60 đăng YouTube với chất lượng tương đương kênh ByteByteGo.**

**[🇬🇧 Read Documentation in English](./README.md)**

---

## 🔥 Các nâng cấp đột phá trong bản v2.0 (Chuẩn hóa theo ByteByteGo thật)

Phiên bản **v2.0** được nâng cấp dựa trên việc mổ xẻ từng khung hình (frame-by-frame) từ các video thực tế của kênh **ByteByteGo** (*HTTP1 vs HTTP2 vs HTTP3*, *Database ACID Transactions*, *Linux Boot Process*):

1. **Nền `#262626` Charcoal + Sóng Lượn Hữu Cơ 2 Lớp (`backdrop: 'waves'`)**: Thay thế nền đen đặc cứng nhắc bằng tông xám than ấm `#262626` kèm hiệu ứng lượn sóng mềm ở góc phải dưới hoặc tia tốc độ (`speedlines`) và lưới kỹ thuật (`blueprint`).
2. **Thẻ Kính Bán Trong Suốt (`Theme.drawGlassCard`)**: Các khối phân nhóm sử dụng lớp kính mờ (`rgba(..., 0.28)`) với 6 tông màu dịu mắt (`teal`, `emerald`, `plum`, `olive`, `crimson`, `slate`), viền mảnh và nhãn pill gắn gọn trên góc.
3. **Hiệu Ứng Nét Vẽ Tự Chạy (`Effects.strokeDraw`) & Chữ Gõ Phím (`Effects.typeText`)**: Mọi thành phần kiến trúc, máy chủ, trình duyệt và mũi tên đều tự vẽ nét контур từ `0 -> 1` giống hệt hiệu ứng Trim Paths trong After Effects.
4. **Camera Ảo 2D Điện Ảnh (`Camera.zoomTo`, `Camera.reset`)**: Hỗ trợ thu phóng mượt mà từ góc nhìn toàn cảnh (Overview) vào chi tiết từng node xử lý thay vì nhồi nhét mọi thứ cố định trên một màn hình.
5. **28 Hình Minh Họa & Archetype Chuyên Biệt (Không lặp lại khối hộp)**:
   - **14 Archetype đặc trưng của ByteByteGo**:
     - `isometricServerStack`: Cụm máy chủ 3D xếp tầng wireframe kèm đèn LED.
     - `foldedFileBadge`: Biểu tượng tài liệu gấp góc kèm nhãn màu (`HTML`, `JSON`, `SQL`, `LOG`).
     - `wireframeBrowser`: Trình duyệt viền mảnh phát sáng với nhãn `WWW`.
     - `wireframeCylinderDb`: Cơ sở dữ liệu hình trụ vẽ nét wireframe.
     - `lineArtUser`: Nhân vật người dùng nét mảnh (`User A`, `User B`) cho bài toán giao dịch.
     - `stateMutationCard`: Bảng biến đổi trạng thái / số dư tài khoản (`$600 -> $400`).
     - `brokenLinkPlug`: Phích cắm đứt kết nối + dấu gạch chéo đỏ động (`✕`) mô tả lỗi mạng / Rollback.
     - `evolutionTimeline`: Thanh tiến hóa phiên bản ngang (`HTTP/1.0 -> HTTP/1.1 -> HTTP/2 -> HTTP/3`).
     - `heroMetricSlam`: Con số / năm khổng lồ giữa màn hình (`2015`, `< 1ms`) tạo điểm nhấn nhịp điệu.
     - `comparisonSplitTable`: Bảng kính đối chiếu trực diện 2 công nghệ (`REST vs gRPC`, `BIOS vs UEFI`).
     - `swimlaneSequence`: Biểu đồ chuỗi thời gian nhiều tác nhân (TCP Handshake, Raft, gRPC).
     - `consistentHashRing`: Vòng băm nhất quán (Consistent Hashing Ring) định tuyến phân mảnh.
     - `bTreeHierarchy`: Cây chỉ mục B-Tree nhiều tầng với nhánh tìm kiếm phát sáng.
     - `networkPacketFrame`: Khung gói tin phân tách từng lớp Header (`IPv6 | TCP | TLS | Payload`).
6. **Bộ Tổng Hợp Âm Thanh Chuyển Động (Procedural 48kHz Stereo Motion SFX)**: Tự động sinh hiệu ứng âm thanh tinh tế (`pop`, `draw`, `whoosh`, `tick`, `success`, `error`) ngay từ mã nguồn và ghép vào file MP4 mà không cần file âm thanh ngoài.
7. **Tích Hợp [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) & Giọng Thuyết Minh Senior Solutions Architect (`src/audio/voicestudio.js`)**:
   - Kết nối trực tiếp với **VoiceStudio** (`http://localhost:3900` hoặc `voicestudio` CLI) để thiết kế giọng (`techvid voice design --persona senior-sa`) và thuyết minh tự nhiên như một **Senior Solutions Architect** thực thụ (`senior-sa`, `staff-engineer`, `tech-storyteller`, `vi-senior-sa`).
   - Tự động chuẩn hóa cách đọc thuật ngữ kỹ thuật (`< 100 μs`, `100K+ QPS`, `O(log N)`, `p99`, `epoll`, `fsync`, `BGSAVE`), tự động khớp thời lượng từng phân cảnh (`atempo` rate-fit) và xử lý âm thanh chuẩn phòng thu (`-14 LUFS` + Studio Condenser EQ).

---

## 🚀 Hướng dẫn sử dụng nhanh

### 1. Cài đặt & Kiểm thử
```bash
cd /Users/wei/.gemini/antigravity/scratch/tech-video-studio
npm test
```

### 2. Tra cứu hình minh họa theo chủ đề
```bash
node bin/tech-video-studio.js metaphor "acid transaction rollback"
node bin/tech-video-studio.js metaphor "sharding consistent hashing"
```

### 3. Kiểm tra chất lượng hình ảnh (QA Contact Sheet + Đo khoảng trống)
```bash
node bin/tech-video-studio.js qa examples/bytebytego-system-design/index.html
```

### 4. Xuất video MP4 1080p60 (Tự động ghép âm thanh hiệu ứng SFX)
```bash
node bin/tech-video-studio.js render examples/bytebytego-system-design/index.html -o examples/bytebytego-system-design/bytebytego_v2_showcase.mp4
```

---

## 🤖 Cài đặt làm AI Skill (Cho Antigravity, Claude Code, Cursor, Codex)

```bash
# Cài trực tiếp vào Google Antigravity
node bin/tech-video-studio.js install-skill --target antigravity

# Hoặc cài cho Claude Code / Cursor
node bin/tech-video-studio.js install-skill --target claude
node bin/tech-video-studio.js install-skill --target cursor
```
