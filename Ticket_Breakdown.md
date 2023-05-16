# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. 

We're working on a new feature which will generate reports for our client Facilities containing info on 
how many hours each Agent worked in a given quarter by summing up every Shift they worked. 

Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, 
  returning all Shifts worked that quarter, 
  including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. 
  It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

"""
Currently, the id of each Agent on the reports we generate is their internal database id. 
We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with 
and use that id when generating reports for them.
"""

##  If description is brief, ensure the assigned ticket is clear and confirm with ticket reporter.

After reading and having a first understanding of the text of the ticket descripton, I would try to breakdown it first on a high level, and then quickly review with the the reporter and ensure my understanding of the ticket is correct. This could warranty none of us get lost on translation, and the work to be done is aligned with him o her, so we save work and time.


## Breakdown 

### Initial Assumptions


As I am not familiar with the initial architecture and the codebase, I'm going to break it down using assumptions.

- Each table of the database mentioned has each own API resource.
- With `getShiftsByFacililty` I understand that we can call it like `Facilities.getShifttsByfacilities` 
- Resource outputs are currently returning original AgentIDS, and in some cases should return CustomIDS.
- We want to implement Agent Custom Ids for each Facility. Therefore, we will need to relate Facilities <-> Agents. 
- If we are using a relational database, this could be done doing a relational table, we can name it: CustomFacilityAgentIds for now (*1)

(*1) - I'm pretty sure this name can be better if we rethink it twice, this could be discussed with the team and agree what sounds best




// - From here, everything is WORK IN PROGRESS, I'm thinking about it at the moment. 
// - I also asked ChatGPT to ask his response, which has been clear, but needs revision, I think it can have some problems, we'll see later.


The relational table can look like this: 

CustomFacilityAgentIds

```
id | CustomId | FacilityId | AgentId 
------------------------------------
 1 |        1 |         23 |    304
 2 |        2 |         23 |    203
 3 |        3 |         23 |     28
 4 |        1 |          8 |    304
 5 |        2 |          8 |     17
```


Shifts are storing original AgentIds, but might be saving CustomFacilityAgentIds:


Original: 

```
id | FacilityId | AgentId 
--------------------------
 1 |         23 |    304
 2 |         23 |    203
 3 |         23 |     28
 4 |          8 |    304
 5 |          8 |     17
```


Migration and new column: 

```
id | FacilityId | AgentId (deprecated)   | CustomFacilityAgentIds
-------------------------------------------------------------------
 1 |         23 |    304                 | 3
 2 |         23 |    203                 | 6
 3 |         23 |     28                 | 67
 4 |          8 |    304                 | 99
 5 |          8 |     17                 | 43
```


## Possible tickets:

1. Add Custom ID Field to Agent Profile
2. Update Shift Metadata to Include Custom Agent ID
3. Update Report Generation to Use Custom Agent ID
4. Update Report Submission to Include Custom Agent ID
