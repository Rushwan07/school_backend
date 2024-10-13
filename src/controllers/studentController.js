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

    const newStudent1 = await Student.findById(newStudent?._id).populate(
        "classId"
    );

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
            student: newStudent1,
        },
    });
});
exports.getStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;

    const student = await Student.findById(studentId)
        .populate("parentId", "name phone email address")
        .populate("classId", "name capacity")
        .populate("transportations");

    if (!student) {
        return next(new AppError("Student not found", 404));
    }

    res.status(200).json({
        status: "success",
        data: {
            student,
        },
    });
});

exports.editStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const { student, parent, transport } = req.body;

    // Find the student
    const existingStudent = await Student.findById(studentId);
    if (!existingStudent) {
        return next(new AppError("Student not found", 404));
    }

    // Update student details
    if (student) {
        if (student.regno && student.regno !== existingStudent.regno) {
            const existingRegno = await Student.findOne({
                regno: student.regno,
            });
            if (existingRegno) {
                return next(
                    new AppError("Registration number already exists", 400)
                );
            }
            existingStudent.regno = student.regno;
        }
        if (student.name) existingStudent.name = student.name;
        if (student.address) existingStudent.address = student.address;
        if (student.img) existingStudent.img = student.img;
        if (student.bloodType) existingStudent.bloodType = student.bloodType;
        if (student.sex && ["MALE", "FEMALE"].includes(student.sex)) {
            existingStudent.sex = student.sex;
        }
        if (student.birthday) existingStudent.birthday = student.birthday;
        if (
            student.classId &&
            student.classId !== existingStudent.classId.toString()
        ) {
            // If the class is changed, update the class
            const oldClass = await Class.findById(existingStudent.classId);
            oldClass.studentsId.pull(existingStudent._id);
            await oldClass.save();

            const newClass = await Class.findById(student.classId);
            newClass.studentsId.push(existingStudent._id);
            await newClass.save();

            existingStudent.classId = student.classId;
        }
    }

    if (parent) {
        let parentId = existingStudent.parentId;
        let existingParent = await Parent.findById(parentId);

        if (existingParent) {
            if (parent.name) existingParent.name = parent.name;
            if (parent.phone) existingParent.phone = parent.phone;
            if (parent.email && parent.email !== existingParent.email) {
                const emailExists = await Parent.findOne({
                    email: parent.email,
                });
                if (emailExists) {
                    return next(
                        new AppError("Parent email already exists", 400)
                    );
                }
                existingParent.email = parent.email;
            }
            if (parent.address) existingParent.address = parent.address;
            await existingParent.save();
        } else {
            const newParent = await Parent.create({
                name: parent.name,
                email: parent.email,
                phone: parent.phone,
                address: parent.address,
            });
            existingStudent.parentId = newParent._id;
        }
    }

    if (transport) {
        let transportId = existingStudent.transportations;
        let existingTransport = await StudentTransport.findById(transportId);

        if (existingTransport) {
            if (transport.pickupLocation)
                existingTransport.pickupLocation = transport.pickupLocation;
            if (transport.dropOffLocation)
                existingTransport.dropOffLocation = transport.dropOffLocation;
            if (transport.busId) existingTransport.busId = transport.busId;
            if (transport.fees) existingTransport.fees = transport.fees;
            await existingTransport.save();
        } else {
            const newTransport = await StudentTransport.create({
                studentId: existingStudent._id,
                regNo: existingStudent.regno,
                pickupLocation: transport.pickupLocation,
                dropOffLocation: transport.dropOffLocation,
                busId: transport.busId,
                fees: transport.fees,
            });
            existingStudent.transportations = newTransport._id;
        }
    }

    await existingStudent.save();

    res.status(200).json({
        status: "success",
        data: {
            student: existingStudent,
        },
    });
});

exports.getAllStudentsGroupedByClass = catchAsync(async (req, res, next) => {
    const students = await Class.find().populate("studentsId");
    // const students = await Student.aggregate([
    //     {
    //         $group: {
    //             _id: "$classId", // Group by classId
    //             students: { $push: "$$ROOT" }, // Push all the student details into an array
    //         },
    //     },
    //     {
    //         $lookup: {
    //             from: "classes", // Lookup the Class collection
    //             localField: "_id", // classId in Student
    //             foreignField: "_id", // _id in Class
    //             as: "classDetails", // Output as classDetails
    //         },
    //     },
    //     {
    //         $unwind: {
    //             path: "$classDetails",
    //             preserveNullAndEmptyArrays: true, // Keep results even if the classId doesn't match a class
    //         },
    //     },
    //     {
    //         $sort: { "classDetails.name": 1 }, // Sort by class name (optional)
    //     },
    // ]);

    res.status(200).json({
        status: "success",
        data: {
            groupedStudents: students,
        },
    });
});

exports.getAllStudents = catchAsync(async (req, res, next) => {
    const students = await Student.find().populate("classId");
    res.status(200).json({
        status: "success",
        data: {
            students,
        },
    });
});
