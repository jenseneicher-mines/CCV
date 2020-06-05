# CCV
Conference Cycle Visualization

**PROJECT GOAL**
In computer science, publication revolves around cyclic conference deadlines
rather than rolling journal submissions. This means that CS researchers need
to keep track of a variety of conferences relevant to their lab, including when
papers for those conferences are due, when they’ll get notifications of acceptance.
The goal of this project is to provide a tool for CS researchers to visualize
and manage their upcoming conference deadlines.

**ADMIN AND NON-ADMIN APPS**

Two apps are set forth by this project--a side that faces admin users and a side that faces non-admin users. Admin users will be able to 
customize the visualization using the admin-facing app. Non-admin users
will be able to view the visualization without customization. The 
sections of this README marked with (Admin) apply to the admin-facing
app. The non-admin-facing app is the same except it lacks add, edit,
delete, import, and export functionality; it is read-only, in other
words, and lacks customization ability.

**(ADMIN) WEBSITE LOOK/LAYOUT**

Homepage of Conference Cycle Visualization Website:
![Alt text](/Images/CCVwebsiteImage.PNG)

Add Conference Pop-up Window:
![Alt text](/Images/CCVwebsiteImage2.PNG)

**(ADMIN) SETUP/USAGE/HOW TO**

To load conference rings into the visualization, click the "Choose File" button and select the text file you want to import. The text file in this repository named "conference_data.txt" is an example of a file that can
be imported.

Whenever you want to add a conference to the visualization, simply click
the "Enter a Conference" button at the top-left of the view window.
Once clicked, a pop-up window will appear. Either enter a conference
title in the "Search by Title" field, a URL of a CFP/conference from 
WikiCFP, or manually enter the conference's details. You may edit the
automatically scraped data in the fields listed under "Manually
Enter Conference Details". There you may add optional notes also. When
finished, click the "Done" button at the bottom to add the conference
to the visualization on the home screen. A new ring will appear with
a distinct color.

Deleting conferences is easy; simply click a ring, identify it is the
conference you intend to delete, and click the "Delete Conference"
button that appears beneath the description box on the right side of
the home screen. Once pressed, the conference will be removed from the 
visualization as expected.

To export the conference data you have built using this app, simply
click the "Export Data" button at the bottom of the home screen.
This button creates a text file that contains the preferences you have
set up in the app. This text file can be imported into the app again
whenever needed to make changes. Remember to save your work by exporting
a file when using the app! Edits will not be saved unless they are
exported in a text file like so.

**(ADMIN) CUSTOMIZE/ADDITIONAL/IMPORTANT TIPS**

The calendar icon is an excellent way to set date information 
manually using a graphical user interface. Simply click the square
icon beside any date field while editing a conference to change its
date using the GUI.

The blue underlined "WikiCFP URL" hyperlink above the "Load Conference"
field is clickable--selecting this text will open WikiCFP in your web
browser. Use this site to find the URL of a conference/CFP easily and
conveniently.

**CONTACTS**

DEVELOPERS:
- Jensen Eicher (jeicher@mines.edu)
- Benjamin Jessing (bjessing@mines.edu)
- Daniel Garcia (drgarcia@mines.edu)
  
OWNER:
- Dr. Tom Williams (twilliams@mines.edu)

PROJECT ADVISOR:
- Dr. Jeffrey Paone (jpaone@mines.edu)