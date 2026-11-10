# Text to Speech VN

Ứng dụng chuyển văn bản thành giọng nói tiếng Việt, sử dụng Gemini TTS.

## Kiến trúc triển khai

- **Frontend:** GitHub Pages (React + Vite).
- **Backend:** Render Web Service (Express + Gemini API).
- **API:** `POST /api/tts`; endpoint kiểm tra tình trạng: `GET /health`.
- Khóa `GEMINI_API_KEY` chỉ được lưu ở máy chủ Render, tuyệt đối không đưa vào mã frontend hoặc GitHub Pages.

## Chạy tại máy cá nhân

Yêu cầu Node.js 22 trở lên.

1. Cài đặt: `npm install`
2. Tạo file `.env` ở thư mục gốc và khai báo `GEMINI_API_KEY=your_key`.
3. Chạy ứng dụng: `npm run dev`
4. Mở địa chỉ local được hiển thị trong terminal.

## Triển khai backend lên Render

Repository đã có Blueprint `render.yaml`.

1. Đăng nhập Render, chọn **New → Blueprint**.
2. Kết nối repository `tranthanhphucbvdkgr/Text_to_speech_Vn` và nhánh `main` (hoặc nhánh đã merge thay đổi triển khai).
3. Khi Render yêu cầu biến bí mật, nhập `GEMINI_API_KEY` bằng khóa Gemini của bạn.
4. Chờ dịch vụ triển khai thành công. Kiểm tra `https://<ten-dich-vu>.onrender.com/health` trả về JSON có `status: "ok"`.
5. Sao chép URL backend dạng `https://<ten-dich-vu>.onrender.com`.

Render tự thiết lập `PORT`. Không cần đưa khóa Gemini vào repository.

## Kết nối GitHub Pages với Render

Trong GitHub repository, mở **Settings → Secrets and variables → Actions → Variables**, tạo biến:

- Name: `VITE_API_BASE_URL`
- Value: URL backend Render, ví dụ `https://text-to-speech-vn-api.onrender.com` (thay bằng URL thực tế của dịch vụ).

Sau đó chạy lại workflow **Deploy Vite app to GitHub Pages** trong tab Actions hoặc push commit mới lên `main`.

GitHub Pages URL dự kiến: https://tranthanhphucbvdkgr.github.io/Text_to_speech_Vn/

## Biến môi trường backend

| Biến | Mục đích |
|---|---|
| `GEMINI_API_KEY` | Khóa Gemini (bắt buộc, chỉ lưu trên Render) |
| `FRONTEND_URL` | Origin frontend được phép gọi API; mặc định đã gồm GitHub Pages |
| `NODE_ENV` | Render đặt `production` |
| `PORT` | Render tự cấp |

## Lưu ý

GitHub Pages chỉ phục vụ nội dung tĩnh; không thể chạy Express hoặc giữ bí mật Gemini API Key. Backend Render là thành phần cần thiết để giữ nguyên tính năng tạo âm thanh AI.
