**User APIs**



| Method | Endpoint              | Description                |

| ------ | --------------------- | -------------------------- |

| POST   | `/api/users/register` | Register a new user        |

| POST   | `/api/users/login`    | Login user                 |

| GET    | `/api/users/profile`  | Get logged-in user profile |

| PUT    | `/api/users/profile`  | Update user profile        |

| DELETE | `/api/users/:id`      | Delete user                |







**Admin APIs**



| Method | Endpoint               | Description          |

| ------ | ---------------------- | -------------------- |

| POST   | `/api/admin/login`     | Admin login          |

| GET    | `/api/admin/dashboard` | Dashboard statistics |

| GET    | `/api/admin/users`     | Get all users        |

| GET    | `/api/admin/bookings`  | Get all bookings     |

| GET    | `/api/admin/cars`      | Get all cars         |









**Car APIs**



| Method | Endpoint        | Description            |

| ------ | --------------- | ---------------------- |

| GET    | `/api/cars`     | Get all available cars |

| GET    | `/api/cars/:id` | Get a single car       |

| POST   | `/api/cars`     | Add a new car          |

| PUT    | `/api/cars/:id` | Update car             |

| DELETE | `/api/cars/:id` | Delete car             |









**Booking APIs**



| Method | Endpoint                   | Description                   |

| ------ | -------------------------- | ----------------------------- |

| POST   | `/api/bookings`            | Book a cab                    |

| GET    | `/api/bookings`            | Get all bookings              |

| GET    | `/api/bookings/my`         | Get logged-in user's bookings |

| GET    | `/api/bookings/:id`        | Get booking by ID             |

| PATCH  | `/api/bookings/:id/status` | Update booking status         |

| DELETE | `/api/bookings/:id`        | Cancel booking                |









**Payment APIs**



| Method | Endpoint                | Description     |

| ------ | ----------------------- | --------------- |

| POST   | `/api/payments`         | Make payment    |

| GET    | `/api/payments/:id`     | Payment details |

| GET    | `/api/payments/history` | Payment history |



