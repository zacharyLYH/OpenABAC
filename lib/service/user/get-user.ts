export const getUser = async () => {
    return [
        {
            jsonCol: {
                name: "John Doe",
                age: 30,
                occupation: "Engineer"
            },
            applicationUserId: "012345",
            id: "001",
            modifiedDate: new Date(), // Current date and time
            createdDate: new Date('2023-01-01') // Specific date
        },
        {
            jsonCol: {
                name: "Jane Smith",
                age: 25,
                occupation: "Designer"
            },
            applicationUserId: "012346",
            id: "002",
            modifiedDate: new Date(), // Current date and time
            createdDate: new Date('2023-01-02') // Specific date
        },
        {
            jsonCol: {
                name: "Bob Brown",
                age: 32,
                occupation: "Teacher"
            },
            applicationUserId: "012348",
            id: "004",
            modifiedDate: new Date(),
            createdDate: new Date('2023-01-04')
        },
        {
            jsonCol: {
                name: "Carol White",
                age: 29,
                occupation: "Doctor"
            },
            applicationUserId: "012349",
            id: "005",
            modifiedDate: new Date(),
            createdDate: new Date('2023-01-05')
        },
    ]
}