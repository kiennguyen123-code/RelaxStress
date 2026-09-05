# RelaxStress - Mental Health & Stress Relief Application

Ứng dụng hỗ trợ theo dõi tâm trạng, giảm căng thẳng và đề xuất các bài tập thư giãn cá nhân hóa.

## 🛠️ Công nghệ sử dụng

- **Frontend**: React, Vite, Lucide Icons, CSS Modules / Custom Styling
- **Backend**: Java 21, Spring Boot 3, Spring Data JPA, Lombok
- **Database**: PostgreSQL / Supabase
- **Architecture**: RESTful API, Controller-Service-Repository pattern

---

## 🚀 Hướng dẫn khởi chạy

### 1. Backend (Spring Boot)
```bash
cd backend
./mvnw.cmd spring-boot:run  # Windows
# hoặc ./mvnw spring-boot:run trên Linux/macOS
```
Backend sẽ khởi chạy tại: `http://localhost:8080`

### 2. Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend sẽ khởi chạy tại: `http://localhost:5173`

---

## 📌 Các tính năng chính

- **Home Page**: Chào buổi sáng/tối, trích dẫn truyền cảm hứng, gợi ý bài tập nhanh, thống kê stress.
- **Mood Tracker**: Lịch theo dõi cảm xúc hàng ngày, đánh giá mức độ căng thẳng (1 - 5 sao).
- **Exercises Listing**: Danh sách bài tập hít thở, thiền định, giãn cơ, kèm bộ lọc danh mục.
- **Smart Recommendations API**: Gợi ý bài tập phù hợp dựa theo mức độ stress và quỹ thời gian hiện có.
- **RESTful Endpoints**: Quản lý người dùng, check-in tâm trạng, và ghi nhận phiên tập luyện.
