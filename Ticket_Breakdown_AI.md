
# AI response

Also, as we live in 2023 and we have new tools I had to ask the AI to give me his opinion.
I do not completetly agree like his solution for different reasons, although the output is clean and I think it is also convenient to contrast this view.

### Ticket 1: Add Custom ID Field to Agent Profile

Description:
The task is to modify the Agent profile in the database by adding a custom ID field. 
This custom ID will be used by Facilities when generating reports for Agents instead of the internal database ID.

Acceptance Criteria:

- The custom ID field is added to the Agent table in the database.
- The custom ID field is editable by Facilities.
- The custom ID field is unique for each Agent.
- The custom ID field is displayed on the Agent profile page.

Implementation Details:

- Modify the database schema to include a new column named "custom_id" in the Agent table.
- Add an input field for the custom ID on the Agent profile page.
- Implement validation to ensure the custom ID is unique.
- Update the database queries and API endpoints to handle the custom ID field.

Effort Estimate: 4 hours

### Ticket 2: Update Shift Metadata to Include Custom Agent ID

Description:
The task is to update the shift metadata to include the custom ID of the Agent assigned to each shift. Currently, the metadata only contains the internal database ID of the Agent.

Acceptance Criteria:

- The shift metadata includes the custom ID of the assigned Agent.
- The custom ID is fetched from the Agent profile and added to the shift metadata.

Implementation Details:

- Modify the database schema to include the custom ID field in the Shifts table.
- Update the function getShiftsByFacility to fetch the custom ID from the Agent profile and include it in the shift metadata.

Effort Estimate: 3 hours

### Ticket 3: Update Report Generation to Use Custom Agent ID

Description:
The task is to update the report generation process to use the custom ID of Agents instead of their internal database ID.

Acceptance Criteria:

- The report generation process uses the custom ID of the Agents.
- The custom ID is fetched from the shift metadata and included in the generated report.

Implementation Details:

- Modify the function generateReport to retrieve the custom ID from the shift metadata and include it in the generated report.

Effort Estimate: 2 hours

### Ticket 4: Update Report Submission to Include Custom Agent ID

Description:
The task is to update the report submission process to include the custom ID of Agents when submitting the generated report.

Acceptance Criteria:

- The report submission process includes the custom ID of the Agents.
- The custom ID is fetched from the shift metadata and included in the report submission.

Implementation Details:

- Modify the report submission functionality to retrieve the custom ID from the shift metadata and include it when submitting the report.

Effort Estimate: 2 hours