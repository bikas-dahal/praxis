import 'server-only';

import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { getUserSession } from "@/actions/auth/session";

export const DashboardCards = async () => {
  const session = await getUserSession();

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {/* Your Quizzes */}
      <Card className="flex-1 min-w-[300px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Your Quizzes(❌)</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Math Quiz</span>
              <span className="text-sm text-gray-500">85%</span>
            </li>
            <li className="flex justify-between">
              <span>Science Quiz</span>
              <span className="text-sm text-gray-500">72%</span>
            </li>
            <li className="flex justify-between">
              <span>General Knowledge</span>
              <span className="text-sm text-gray-500">90%</span>
            </li>
          </ul>
          <Button className="mt-4 w-full" asChild>
            <Link href="/quizzes">Take a Quiz</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Chat */}
      <Card className="flex-1 min-w-[300px] max-w-[400px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Chat(✅)</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Engage with peers and mentors in real-time.
          </p>
          <Button className="mt-4 w-full" asChild>
            <Link href="/dashboard/chat">Open Chat</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Resources */}
      <Card className="flex-1 min-w-[300px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Resources(❌)</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <Link href="/resources/math-notes" className="text-blue-600 hover:underline">
                Math Notes
              </Link>
            </li>
            <li>
              <Link href="/resources/science-guides" className="text-blue-600 hover:underline">
                Science Guides
              </Link>
            </li>
            <li>
              <Link href="/resources/current-affairs" className="text-blue-600 hover:underline">
                Current Affairs
              </Link>
            </li>
          </ul>
          <Button className="mt-4 w-full" asChild>
            <Link href="/resources">View All Resources</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Blogs */}
      <Card className="flex-1 min-w-[300px] ">
        <CardHeader>
          <h2 className="text-lg font-semibold">Latest Blogs(✅)</h2>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>
              <Link href="/blogs/exam-prep-strategies" className="text-blue-600 hover:underline">
                Exam Prep Strategies
              </Link>
            </li>
            <li>
              <Link href="/blogs/time-management-tips" className="text-blue-600 hover:underline">
                Time Management Tips
              </Link>
            </li>
            <li>
              <Link href="/blogs/latest-exam-trends" className="text-blue-600 hover:underline">
                Latest Exam Trends
              </Link>
            </li>
          </ul>
          <Button className="mt-4 w-full" asChild>
            <Link href="/dashboard/blogs">Read Blogs</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Progress */}
      <Card className="flex-1 min-w-[300px]">
        <CardHeader>
          <h2 className="text-lg font-semibold">Progress Tracker(❌)</h2>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2">
            Track your performance over time:
          </p>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Completed Quizzes</span>
              <span>10</span>
            </li>
            <li className="flex justify-between">
              <span>Average Score</span>
              <span>82%</span>
            </li>
            <li className="flex justify-between">
              <span>Days Active</span>
              <span>30</span>
            </li>
          </ul>
          <Button className="mt-4 w-full" asChild>
            <Link href="/progress">View Detailed Progress</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
