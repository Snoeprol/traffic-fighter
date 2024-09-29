# Project description

This project automatically fights Dutch traffic fines and violations.

# Requirements

There are two types of requirements:

# Feature requirements

1. User Dashboard:
Overview of all submitted fines and their statuses (e.g., pending, in process, resolved).
Summary of fines by type (e.g., speeding, parking, etc.).
Notification center for updates on the status of cases.
2. Violation Submission:
Form to Fill in Violation Details:
Fields for entering the violation type (e.g., speeding, parking).
Date and time of the violation.
Location of the incident.
Amount of the fine.
Automated Data Extraction:
OCR (Optical Character Recognition) to extract details directly from scanned documents or images of the fine.
Violation Categorization:
Automatic categorization based on the provided violation details.
3. Document Upload:
Upload Functionality:
Support for various document types (PDF, JPEG, PNG).
Drag-and-drop area for easy document upload.
Document Requirements:
Checklist of required documents (e.g., traffic fine notice, proof of payment, additional supporting evidence).
Verification and Validation:
Automated checks for required fields in uploaded documents.
Notifications for missing or invalid documents.
4. Legal Defense Preparation:
Automatic Defense Drafting:
Pre-defined templates for different violation types.
Personalized defense suggestions based on provided violation details.
Legal Advisor Chatbot:
Chatbot integration for legal advice and guidance on the case.
5. Case Tracking and Management:
Case Status Tracker:
Real-time status updates on case submission, review, and resolution.
Deadline Reminders:
Automated reminders for submission deadlines and response windows.
Resolution Archive:
History of all resolved cases, including the outcome and any correspondence.
6. User Profile Management:
Profile Information:
Personal details (name, address, contact information).
License and vehicle information.
Document Management:
Secure storage and management of personal documents related to traffic violations.
7. Payment and Refund Management:
Fine Payment Tracking:
Tracking of fine payments and due dates.
Refund Requests:
Automated generation and submission of refund requests for successfully contested fines.
8. Multi-language Support:
Interface and documentation available in Dutch and English for broader accessibility.



# Current File structure

.next
app
│   ├── fonts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
lib
│   └── utils.ts
node_modules
requirements
│   └── frontend_instructions.md
.eslintrc.json
.gitignore
components.json
next-env.d.ts
next.config.mjs
package-lock.json
package.json
postcss.config.mjs
README.md
tailwind.config.ts
tsconfig.json

# Rules

- All new components should be in the components folder and be named like example-component.tsx, unless specified otherwise.
- All new pages go in /app