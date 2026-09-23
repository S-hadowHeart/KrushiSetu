# KrushiSetu – Report Screenshots (Chapter 8)

All screenshots taken from local run on 2026-09-23:
- Backend: http://localhost:4000 (Neon Postgres, seeded demo data)
- Frontend: http://localhost:5173 (Vite dev)

Demo accounts used (from backend-api/prisma/seed.js):
- Farmer: farmer@example.com / Farmer123!
- Buyer: buyer@example.com / Buyer123!
- Admin: admin@example.com / ChangeMe123!

## Direct mapping to report Chapter 8 (Figure_8_* files)

| Report ref | Step | File |
|---|---|---|
| Figure 8.1 | Registration form | Figure_8_1_Registration_Form.png (also 02_register.png) |
| Figure 8.2 | E-mail verification | Figure_8_2_Email_Verification_Success.png (also 04b_verify_success.png). Real verification link generated via backend JWT for a freshly registered user, visited in Chrome headless. 04_verify_email.png shows the invalid-token failure state. |
| Figure 8.3 | Login form | Figure_8_3_Login_Form.png (also 03_login.png) |
| Figure 8.4 | New Goods listing form (farmer) | Figure_8_4_New_Goods_Listing_Form.png (also 07_new_goods_farmer.png) |
| Figure 8.5 | New Need form (buyer) | Figure_8_5_New_Need_Form.png (also 13_new_need_buyer.png) |
| Figure 8.6 | Goods detail page with offer form | Figure_8_6_Goods_Detail_With_Offer_Form.png (also 14_goods_detail_offer.png) – publicId 00000000-0000-4000-8000-000000000001 (Fresh Tomatoes) |
| Figure 8.7 | Offers Received inbox | Figure_8_7_Offers_Received_Inbox.png (also 16_offers_buyer.png) – buyer received PENDING offer from farmer with Accept/Decline/Counter |
| Figure 8.8 | Message thread | Figure_8_8_Message_Thread.png (also 12_message_thread_farmer.png) – farmer view of thread with buyer (userId 3) |
| Figure 8.9 | Verification submission form | Figure_8_9_Verification_Submission_Form.png (also 10b_verification_form_buyer.png) – buyer has no prior submission so form is visible. 10_verification.png shows farmer PENDING state. |
| Figure 8.10 | Rating form | Figure_8_10_Rating_Form.png (also 15_rating_form.png) – bottom of goods detail page, “Rate this farmer” |
| Figure 8.11 | Admin dashboard / statistics | Figure_8_11_Admin_Dashboard.png (also 18_admin_dashboard.png) |

## All raw captures

- 01_home.png – public landing
- 05_goods_list.png – goods marketplace (mangos, potato, Fresh Tomatoes)
- 06_needs_list.png – needs list
- 08_dashboard_farmer.png, 17_dashboard_buyer.png – dashboards
- 09_offers_farmer.png (received empty), 09b_offers_sent_farmer.png (sent has 1 PENDING) – farmer offers
- 10_verification.png (farmer PENDING), 10b_verification_form_buyer.png (buyer form)
- 11_messages_inbox.png, 11b_messages_buyer.png, 12_message_thread_farmer.png
- 22_need_detail.png – need publicId 00000000-0000-4000-8000-000000000002
- 19_admin_users.png, 20_admin_goods.png, 21_admin_verifications.png, 23_admin_offers.png, 24_admin_messages.png, 25_admin_needs.png

## How they were taken

Puppeteer-core + installed Chrome headless (`--headless=new`), 1280x900 viewport, via `http://localhost:5173` (localhost, not 127.0.0.1, so the httpOnly refresh cookie is same-site and session restores after navigation). One browser profile per role to avoid cookie clashes. Scripts in C:\Temp\shot-tool\ (shoot3.js, shoot_role.js, fix_shots.js).
