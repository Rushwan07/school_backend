const Student = require("../models/StudentModel");
const Parent = require("../models/ParentModel");
const Class = require("../models/ClassModel");
const StudentTransport = require("../models/StudentTransportModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// {
//     "student":{
//          "regno": "102",
//          "name": "student",
//          "address": "123 Main Street, Anytown, USA",
//          "img": "https://example.com/student.jpg",
//          "bloodType": "A+",
//          "sex": "MALE",
//          "classId": "6704ec91fee39a5e6ebd0162",
//          "birthday": "2024-10-04"
//      },
//      "parent":{
//          "address":"address for the parent",
//          "email":"parent@gmail.com",
//          "name":"test parent",
//          "phone": "8973927483"
//      },
//      "transport":{
//          "pickupLocation":"first place",
//          "dropOffLocation":"first place",
//          "busId":"6704fd73aef79b56b9d4ec06",
//          "fees":500
//      }
//    }
exports.createStudent = catchAsync(async (req, res, next) => {
    const { student, parent, transport } = req.body;

    if (!student.regno || !student.regno.trim()) {
        return next(new AppError("Registration number is required", 400));
    }
    if (!student.name || !student.name.trim()) {
        return next(new AppError("Name is required", 400));
    }
    if (!student.address || !student.address.trim()) {
        return next(new AppError("Address is required", 400));
    }
    if (!student.sex || !["MALE", "FEMALE"].includes(student.sex)) {
        return next(new AppError("Sex must be either MALE or FEMALE", 400));
    }

    if (!student.classId) {
        return next(new AppError("Class ID is required", 400));
    }
    if (!student.birthday) {
        return next(new AppError("Birthday is required", 400));
    }

    const existingRegno = await Student.findOne({ regno: student.regno });
    if (existingRegno) {
        return next(new AppError("Registration number already exists", 400));
    }

    if (!parent || !parent.name || !parent.phone || !parent.address) {
        return next(new AppError("Parent required fields are missing", 400));
    }

    let parentId;
    let existingParent = await Parent.findOne({ email: parent.email });
    if (existingParent) {
        parentId = existingParent._id;
    } else {
        const newParent = await Parent.create({
            name: parent.name,
            email: parent.email,
            phone: parent.phone,
            address: parent.address,
        });
        parentId = newParent._id;
    }

    let transportId;
    if (transport && transport.busId) {
        const newTransport = await StudentTransport.create({
            studentId: null,
            regNo: student.regno,
            pickupLocation: transport.pickupLocation,
            dropOffLocation: transport.dropOffLocation,
            busId: transport.busId,
            fees: transport.fees,
        });
        transportId = newTransport._id;
    }
    const newStudent = await Student.create({
        regno: student.regno,
        name: student.name,
        address: student.address,
        img: student.img,
        bloodType: student.bloodType,
        sex: student.sex,
        parentId: parentId,
        classId: student.classId,
        birthday: student.birthday,
        transportations: transportId ? transportId : null,
    });

    // Update the studentId in the StudentTransport document if transport was saved
    if (transportId) {
        await StudentTransport.findByIdAndUpdate(transportId, {
            studentId: newStudent._id,
        });
    }
    const studentClass = await Class.findById(student?.classId);
    studentClass.studentsId.push(newStudent._id);
    await studentClass.save();

    res.status(201).json({
        status: "success",
        data: {
            student: newStudent,
        },
    });
});
