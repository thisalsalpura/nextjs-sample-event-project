import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Event from "@/database/event.model";
import { v2 as cloudinary } from 'cloudinary';

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const formData = await request.formData();

        let event;

        try {
            event = Object.fromEntries(formData.entries());
        } catch (error) {
            return NextResponse.json({ message: 'Invalid Form Data!', error: error instanceof Error ? error.message : 'Unknown Error!' }, { status: 500 });
        }

        const file = formData.get('image') as File;

        if (!file) return NextResponse.json({ message: 'Image is Required!' }, { status: 400 });

        const tags = JSON.parse(formData.get('tags') as string);
        const agenda = JSON.parse(formData.get('agenda') as string);

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const uploadedResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image', folder: 'events' }, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }).end(buffer);
        });

        event.image = (uploadedResult as { secure_url: string }).secure_url;

        const createdEvent = await Event.create({
            ...event,
            tags,
            agenda
        });

        return NextResponse.json({ message: 'Event Created Successfully!', event: createdEvent }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Event Creation Failed!', error: error instanceof Error ? error.message : 'Unknown Error!' }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();

        const events = await Event.find().sort({ createdAt: -1 }).lean();

        return NextResponse.json({ message: 'Events Fetched Successfully!', events: JSON.parse(JSON.stringify(events)) }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Failed to Fetch Events!', error: error instanceof Error ? error.message : 'Unknown Error!' }, { status: 500 });
    }
}