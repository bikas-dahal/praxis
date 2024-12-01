import Link from "next/link"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader } from "../ui/card"
import { getUserSession } from "@/actions/auth/session";


export const DashboardCards = async () => {

  const session = await getUserSession();

    return (
        <>
        
        {/* Quizzes */}
        {JSON.stringify(session)}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Your Quizzes</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex justify-between">
                <span>Math Quiz</span>
                <span className="text-sm text-muted-foreground">85%</span>
              </li>
              <li className="flex justify-between">
                <span>Science Quiz</span>
                <span className="text-sm text-muted-foreground">72%</span>
              </li>
              <li className="flex justify-between">
                <span>General Knowledge</span>
                <span className="text-sm text-muted-foreground">90%</span>
              </li>
            </ul>
            <Button className="mt-4 w-full" asChild>
              <Link href="/quizzes">Take a Quiz</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Chat */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Chat</h2>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Engage with peers and mentors in real-time.
            </p>
            <Button className="mt-4 w-full" asChild>
              <Link href="/chat">Open Chat</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Resources</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link href="/resources/math-notes" className="text-primary">
                  Math Notes
                </Link>
              </li>
              <li>
                <Link href="/resources/science-guides" className="text-primary">
                  Science Guides
                </Link>
              </li>
              <li>
                <Link href="/resources/current-affairs" className="text-primary">
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
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Latest Blogs</h2>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li>
                <Link href="/blogs/exam-prep-strategies" className="text-primary">
                  Exam Prep Strategies
                </Link>
              </li>
              <li>
                <Link href="/blogs/time-management-tips" className="text-primary">
                  Time Management Tips
                </Link>
              </li>
              <li>
                <Link href="/blogs/latest-exam-trends" className="text-primary">
                  Latest Exam Trends
                </Link>
              </li>
            </ul>
            <Button className="mt-4 w-full" asChild>
              <Link href="/blogs">Read Blogs</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Progress */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold">Progress Tracker</h2>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">
              Track your performance over time:
            </p>
            <ul className="space-y-3">
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
        </>
    )
}