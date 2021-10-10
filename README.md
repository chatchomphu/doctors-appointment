# doctors-appointment

# ตัว Web API สามารถทําการ
# 1. เรียกดู slot ที่ว่างอยู่ของหมอทั้งหมดในช่วงเวลาที่กำหนดได้ โดยมี parameter ที่จะส่งให้คือ วันที่เริ่มต้น และวันที่สิ้นสุด

API: Get Free Slot 
Method: Get 

Path: /doctors-appointment/v1/free-slots
Description: เรียกดู slot ว่างของหมอทั้งหมด และสามารถระบุช่วงเวลาได้โดย 
ใส่ Query String ตาม format นี้ time=from:2021-10-09T17:00:00.000Z,to:2021-10-15T17:00:00.000Z
Example Point: http://localhost:6001/doctors-appointment/v1/free-slots?time=from:2021-10-09T01:59:00.000Z,to:2021-10-15T17:00:00.000Z

Path: /doctors-appointment/v1/free-slots/doctors/:doctorId
Description: เรียกดู slot ว่างของหมอคนที่ต้องการดูเท่านั้น และสามารถระบุช่วงเวลาได้โดยใส่ Query String ตาม format นี้ time=from:2021-10-09T17:00:00.000Z,to:2021-10-15T17:00:00.000Z
Example Point: http://localhost:6001/doctors-appointment/v1/free-slots/doctors/001?time=from:2021-10-09T17:00:00.000Z,to:2021-10-15T17:00:00.000Z 


# 2. ทำการจอง slot ของหมอโดยมี parameters ที่ส่งไปจองคือเบอร์โทรของคนไข้ที่เป็นสมาชิกแฃะรหัส pin code 6 หลัก

API: Create Appointment Doctor 
Method: Post 

Path: /doctors-appointment/v1/appointments
Description: ทำการเก็บบันทึกการนัดหมายของคนไข้ โดยคนไข้หนึ่งคนสามารถนัดได้แค่หนึ่งการนัดหมาย
Example Point: http://localhost:6001/doctors-appointment/v1/appointments


# 3. ทำการยกเลิกการจองของ slot ที่ได้ทำการจองเอาไว้แล้ว

API: Cancel Appointment 
Method: Delete 

Path: /doctors-appointment/v1/appointments/patients/:patient_id
Description: ลบรายการนัดหมาย และทำการคืน slot ว่างเข้าสู่ระบบ
Example Point: http://localhost:6001/doctors-appointment/v1/appointments/patients/3


# 4. เรียกดูสรุปการจองของหมอแต่ละคน โดยมี parameter ที่ส่งไปคือ id ของหมอ

API: List Appointment 
Method: Get 

Path: /doctors-appointment/v1/appointments/doctors/:doctorId
Description: แสดงรายการนัดหมายของหมอแต่ละคน
Example Point: http://localhost:6001/doctors-appointment/v1/appointments/doctors/002


### วิธี start application
 
 0. เตรียมข้อมูล หมอ และ คนไข้ ด้วยคำสั่งตามด้านล่าง
    > node init/initial-data.js
 1. start application ด้วยคำสั่งตามด้านล่าง
    > npm i
    > npm start
 2. ใช้ collection postman ที่แนบในเมล ใช้ในการทดสอบยิงได้ค่ะ
 