# Policy Management System

## Overview

This backend system manages company policies, ensures compliance, and facilitates employee acknowledgements. It supports policy creation, approval, and acknowledgement processes, handling templates, custom policies, periodic acknowledgements, and compliance updates.

## Components

- **Database Models:**
  - `Acknowledge`: Tracks acknowledgements by employees, including dates and status.
  - `Company`: Stores company details.
  - `Employee`: Represents employees and their associated companies.
  - `Policy`: Represents policies, including company association, template reference, and verification status.
  - `PolicyVerification`: Manages policy approval and verification.
  - `Template`: Holds policy template content.

- **Controllers:**
  - `AcknowledgementController`: Manages acknowledgements, periodic requests, and status updates.
  - `CompanyController`: Handles company creation, retrieval, listing, updating, and deletion.
  - `EmployeeController`: Manages employee addition, retrieval, and listing.
  - `PolicyController`: Handles policy creation, retrieval, listing, and creation from templates.

## API Endpoints

- **Acknowledgements:**
  - `GET /acknowledgements/employee/:employeeId`
  - `PATCH /acknowledgements/:acknowledgeId`
  - `POST /acknowledgements/periodic`

- **Companies:**
  - `POST /companies`
  - `GET /companies/:companyId`
  - `GET /companies`
  - `PUT /companies/:companyId`
  - `DELETE /companies/:companyId`

- **Employees:**
  - `POST /employees`
  - `GET /employees/:employeeId`
  - `GET /employees/company/:companyId`

- **Policies:**
  - `POST /policies`
  - `GET /policies/:policyId`
  - `GET /policies/company/:companyId`
  - `POST /policies/from-template`

## Business Requirements Addressed

- **SOC 2 Compliance:** Supports various policy types and templates.
- **Default Templates:** Uses templates for policy creation.
- **Policy Approval:** Tracks and manages policy verification by designated approvers.
- **Employee Acknowledgement:** Manages acknowledgements and compliance tracking.
- **Periodic Requests:** Sends periodic reminders for acknowledgements.
- **Acknowledgement Types:** Differentiates and manages various acknowledgement types.
- **Configurable Policy Lists:** Sends requests based on employee roles.

## Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure environment variables.
4. Start the server with `npx ts-node src/app.ts`
