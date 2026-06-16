// Mock Users Database
const MOCK_USERS = [
    {
        id: '1',
        fullname: 'Ali Ahmad',
        username: 'aliahmad',
        phone: '+60123456789',
        email: 'ali.ahmad@email.com',
        password: 'password123',
        role: 'customer'
    },
    {
        id: '2',
        fullname: 'Mike Johnson',
        username: 'mikejohnson',
        phone: '+60123456790',
        email: 'mike.johnson@meowygroom.com',
        password: 'staff123',
        role: 'staff'
    },
    {
        id: '3',
        fullname: 'Emma Wilson',
        username: 'emmawilson',
        phone: '+60123456791',
        email: 'emma.wilson@meowygroom.com',
        password: 'staff123',
        role: 'staff'
    },
    {
        id: '4',
        fullname: 'Mohamad Hanafi bin Zulkipli',
        username: 'hanafi',
        phone: '+60107745512',
        email: 'hanafi@meowygroom.com',
        password: 'owner123',
        role: 'owner'
    }
];

// Mock Cats Database
const MOCK_CATS = [
    {
        id: '1',
        ownerId: '1',
        name: 'Whiskers',
        breed: 'Persian',
        age: 3,
        weight: 4.5,
        hairType: 'long',
        category: 'adult',
        medicalNotes: 'Allergic to certain shampoos'
    },
    {
        id: '2',
        ownerId: '1',
        name: 'Mittens',
        breed: 'British Shorthair',
        age: 2,
        weight: 3.8,
        hairType: 'short',
        category: 'adult',
        medicalNotes: 'None'
    }
];

// Mock Appointments Database
const MOCK_APPOINTMENTS = [
    {
        id: '1',
        customerId: '1',
        catId: '1',
        catName: 'Whiskers',
        date: '2026-02-15',
        time: '14:00',
        services: ['Basic Grooming', 'Nail Trimming'],
        status: 'confirmed',
        totalPrice: 150.00,
        notes: 'Please be gentle, cat is nervous'
    },
    {
        id: '2',
        customerId: '1',
        catId: '2',
        catName: 'Mittens',
        date: '2026-02-20',
        time: '10:00',
        services: ['Full Grooming', 'Flea Treatment'],
        status: 'pending',
        totalPrice: 200.00,
        notes: ''
    }
];

// Mock Invoices Database
const MOCK_INVOICES = [
    {
        id: 'INV-2024-001',
        customerId: '1',
        appointmentId: '1',
        amount: 150.00,
        status: 'PAID',
        date: '2026-01-15',
        dueDate: '2026-01-22',
        items: [
            { service: 'Basic Grooming', price: 120.00 },
            { service: 'Nail Trimming', price: 30.00 }
        ]
    },
    {
        id: 'INV-2024-002',
        customerId: '1',
        appointmentId: '2',
        amount: 200.00,
        status: 'UNPAID',
        date: '2026-02-01',
        dueDate: '2026-02-08',
        items: [
            { service: 'Full Grooming', price: 170.00 },
            { service: 'Flea Treatment', price: 30.00 }
        ]
    }
];

// Mock Receipts Database
const MOCK_RECEIPTS = [
    {
        id: 'REC-2024-001',
        invoiceId: 'INV-2024-001',
        customerId: '1',
        amount: 150.00,
        paymentMethod: 'Online Banking',
        date: '2026-01-16',
        transactionId: 'TXN-20260116-001'
    }
];

// Mock Notifications
const MOCK_NOTIFICATIONS = [
    {
        id: '1',
        type: 'reminder',
        title: 'Appointment Reminder',
        message: 'Your grooming appointment for Whiskers is scheduled for tomorrow at 2:00 PM. Please arrive 10 minutes early.',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
        senderName: 'Mike Johnson (Staff)'
    },
    {
        id: '2',
        type: 'info',
        title: 'Payment Due',
        message: 'You have an outstanding invoice INV-2024-002 for RM 200.00. Please settle at your earliest convenience.',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        senderName: 'Emma Wilson (Staff)'
    },
    {
        id: '3',
        type: 'success',
        title: 'Booking Confirmed!',
        message: 'Your grooming appointment for Whiskers on Feb 15, 2026 at 2:00 PM has been confirmed. We look forward to pampering your cat!',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
        senderName: 'Emma Wilson (Staff)'
    }
];

// Service Pricing
const SERVICES = {
    kitten: [
        { name: 'Basic Grooming', price: 80.00 },
        { name: 'Full Grooming', price: 120.00 },
        { name: 'Nail Trimming', price: 20.00 },
        { name: 'Ear Cleaning', price: 15.00 },
        { name: 'Flea Treatment', price: 25.00 }
    ],
    adult_short_light: [
        { name: 'Basic Grooming', price: 100.00 },
        { name: 'Full Grooming', price: 150.00 },
        { name: 'Nail Trimming', price: 30.00 },
        { name: 'Ear Cleaning', price: 20.00 },
        { name: 'Flea Treatment', price: 30.00 }
    ],
    adult_short_heavy: [
        { name: 'Basic Grooming', price: 120.00 },
        { name: 'Full Grooming', price: 170.00 },
        { name: 'Nail Trimming', price: 30.00 },
        { name: 'Ear Cleaning', price: 20.00 },
        { name: 'Flea Treatment', price: 30.00 }
    ],
    adult_long_light: [
        { name: 'Basic Grooming', price: 130.00 },
        { name: 'Full Grooming', price: 180.00 },
        { name: 'Nail Trimming', price: 30.00 },
        { name: 'Ear Cleaning', price: 20.00 },
        { name: 'Flea Treatment', price: 30.00 }
    ],
    adult_long_heavy: [
        { name: 'Basic Grooming', price: 150.00 },
        { name: 'Full Grooming', price: 200.00 },
        { name: 'Nail Trimming', price: 30.00 },
        { name: 'Ear Cleaning', price: 20.00 },
        { name: 'Flea Treatment', price: 30.00 }
    ]
};
