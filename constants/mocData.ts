export const attendenceMocData = [
    {
        "id": 7,
        "agentId": 12,
        "date": "2025-01-11T00:00:00.000Z",
        "shift": null,
        "checkInTime": null,
        "checkOutTime": null,
        "status": "ABSENT",
        "isAttend": false,
        "isLate": false,
        "lateMinutes": 0,
        "createdAt": "2025-01-11T06:00:00.000Z",
        "updatedAt": "2025-01-11T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": []
    },
    {
        "id": 6,
        "agentId": 12,
        "date": "2025-01-10T00:00:00.000Z",
        "shift": "EVENING",
        "checkInTime": "2025-01-10T16:30:00.000Z",
        "checkOutTime": "2025-01-10T23:30:00.000Z",
        "status": "PRESENT",
        "isAttend": true,
        "isLate": false,
        "lateMinutes": 0,
        "createdAt": "2025-01-10T06:00:00.000Z",
        "updatedAt": "2025-01-10T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": [
            {
                "id": 61,
                "attendanceId": 6,
                "startTime": "2025-01-10T21:00:00.000Z",
                "endTime": "2025-01-10T21:40:00.000Z",
                "duration": 40,
                "createdAt": "2025-01-10T06:05:00.000Z",
                "updatedAt": "2025-01-10T06:05:00.000Z"
            }
        ]
    },
    {
        "id": 5,
        "agentId": 12,
        "date": "2025-01-09T00:00:00.000Z",
        "shift": "MORNING",
        "checkInTime": "2025-01-09T08:05:00.000Z",
        "checkOutTime": null,
        "status": "PRESENT",
        "isAttend": true,
        "isLate": true,
        "lateMinutes": 5,
        "createdAt": "2025-01-09T06:00:00.000Z",
        "updatedAt": "2025-01-09T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": []
    },
    {
        "id": 4,
        "agentId": 12,
        "date": "2025-01-08T00:00:00.000Z",
        "shift": "EVENING",
        "checkInTime": "2025-01-08T16:42:00.000Z",
        "checkOutTime": "2025-01-08T20:00:00.000Z",
        "status": "PRESENT",
        "isAttend": true,
        "isLate": true,
        "lateMinutes": 12,
        "createdAt": "2025-01-08T06:00:00.000Z",
        "updatedAt": "2025-01-08T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": []
    },
    {
        "id": 3,
        "agentId": 12,
        "date": "2025-01-07T00:00:00.000Z",
        "shift": "EVENING",
        "checkInTime": "2025-01-07T16:30:00.000Z",
        "checkOutTime": "2025-01-07T23:25:00.000Z",
        "status": "PRESENT",
        "isAttend": true,
        "isLate": false,
        "lateMinutes": 0,
        "createdAt": "2025-01-07T06:00:00.000Z",
        "updatedAt": "2025-01-07T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": [
            {
                "id": 31,
                "attendanceId": 3,
                "startTime": "2025-01-07T20:40:00.000Z",
                "endTime": "2025-01-07T21:20:00.000Z",
                "duration": 40,
                "createdAt": "2025-01-07T06:05:00.000Z",
                "updatedAt": "2025-01-07T06:05:00.000Z"
            }
        ]
    },
    {
        "id": 2,
        "agentId": 12,
        "date": "2025-01-06T00:00:00.000Z",
        "shift": "MORNING",
        "checkInTime": "2025-01-06T08:18:00.000Z",
        "checkOutTime": "2025-01-06T16:30:00.000Z",
        "status": "PRESENT",
        "isAttend": true,
        "isLate": true,
        "lateMinutes": 18,
        "createdAt": "2025-01-06T06:00:00.000Z",
        "updatedAt": "2025-01-06T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": [
            {
                "id": 21,
                "attendanceId": 2,
                "startTime": "2025-01-06T12:30:00.000Z",
                "endTime": "2025-01-06T13:20:00.000Z",
                "duration": 50,
                "createdAt": "2025-01-06T06:02:00.000Z",
                "updatedAt": "2025-01-06T06:02:00.000Z"
            }
        ]
    },
    {
        "id": 1,
        "agentId": 12,
        "date": "2025-01-05T00:00:00.000Z",
        "shift": "MORNING",
        "checkInTime": "2025-01-05T08:00:00.000Z",
        "checkOutTime": "2025-01-05T16:30:00.000Z",
        "status": "PRESENT",
        "isAttend": true,
        "isLate": false,
        "lateMinutes": 0,
        "createdAt": "2025-01-05T06:00:00.000Z",
        "updatedAt": "2025-01-05T06:00:00.000Z",
        "agent": {
            "id": 12,
            "name": "John Doe",
            "email": "john@example.com"
        },
        "breaks": [
            {
                "id": 11,
                "attendanceId": 1,
                "startTime": "2025-01-05T12:05:00.000Z",
                "endTime": "2025-01-05T12:45:00.000Z",
                "duration": 40,
                "createdAt": "2025-01-05T06:05:00.000Z",
                "updatedAt": "2025-01-05T06:05:00.000Z"
            }
        ]
    }
]


