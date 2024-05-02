import React from "react";



export default function Contenue(){
    return(
 <>
        <div className="grid grid-cols-3 gap-6 mt-6">
        <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
          <CardTitle>Total Appointment</CardTitle>
          <h2 className="text-3xl font-bold">489</h2>
          <CurvedlineChart className="w-full h-36" />
          <Badge className="mt-2" variant="secondary">
            +5.9% last week
          </Badge>
        </Card>
        <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
          <CardTitle>Total Patients</CardTitle>
          <h2 className="text-3xl font-bold">210</h2>
          <CurvedlineChart className="w-full h-36" />
          <Badge className="mt-2" variant="secondary">
            +4.7 last week
          </Badge>
        </Card>
        <Card className="col-span-1 bg-white p-4 shadow rounded-lg flex flex-col items-center justify-center">
          <CardTitle>Total Earning</CardTitle>
          <h2 className="text-3xl font-bold">489</h2>
          <CurvedlineChart className="w-full h-36" />
          <Badge className="mt-2" variant="secondary">
            +8.2% last week
          </Badge>
        </Card>
      </div>

      <div className="mt-8 bg-white shadow rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="px-5 pt-4 text-xl font-bold">Appointment Activity</h3>
          <div className="flex items-center space-x-4 px-5 pt-4 font-bold">
              <a href="#" onClick={() => handleDateChange(-1)} className="h-5 w-5 text-black font-bold">
                <ChevronLeftIcon />
              </a>
              <time dateTime={date.toISOString()}>
                {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
              <a href="#" onClick={() => handleDateChange(1)} className="h-5 w-5 text-black font-bold">
                <ChevronRightIcon />
              </a>
          </div>
        </div>
        <Table className="mt-4 w-full">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Fees</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Visit Time</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Conditions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <div className="flex flex-row flex-wrap items-center px-5 pt-2">
              <Avatar>
          <AvatarImage alt="Profile picture" src={Doctor} className='h-9 w-9 rounded-full' />
        </Avatar>
                <TableCell className="font-medium">Leslie Alexander</TableCell>
                </div>
              <TableCell>25</TableCell>
              <TableCell>$25/h</TableCell>
              <TableCell>09-15-2020</TableCell>
              <TableCell>09:15-09:45am</TableCell>
              <TableCell>Dr. Jacob Jones</TableCell>
              <TableCell>Mumps Stage II</TableCell>
            </TableRow>
          </TableBody>
          <TableBody>
            <TableRow>
              <div className="flex flex-row flex-wrap items-center px-5 pt-2">
              <Avatar>
          <AvatarImage alt="Profile picture" src={Doctor} className='h-9 w-9 rounded-full' />
        </Avatar>
                <TableCell className="font-medium">Leslie Alexander</TableCell>
                </div>
              <TableCell>25</TableCell>
              <TableCell>$25/h</TableCell>
              <TableCell>09-15-2020</TableCell>
              <TableCell>09:15-09:45am</TableCell>
              <TableCell>Dr. Jacob Jones</TableCell>
              <TableCell>Mumps Stage II</TableCell>
            </TableRow>
          </TableBody>
        </Table>


        <div className="flex justify-between items-center mt-4 px-4 py-3">
          <span className="text-gray-500">Showing 1-12 out of 40</span>
          <div className="flex space-x-2">
          <Button onClick={goToPreviousPage}>Prev</Button>
          <div className="flex space-x-2">
          <Button variant="default">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <span>...</span>
          <Button variant="outline">9</Button>
        </div>
          <Button onClick={goToNextPage}>Next</Button>
          </div>
        </div>
      </div>
      </>
    );
}