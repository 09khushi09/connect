import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import IntroPage from "@/pages/intro";
import JobSeekerLanding from "@/pages/jobseeker-landing";
import RecruiterLanding from "@/pages/recruiter-landing";

function Router() {
  return (
    <Switch>
      <Route path="/" component={IntroPage} />
      <Route path="/jobseeker" component={JobSeekerLanding} />
      <Route path="/recruiter" component={RecruiterLanding} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
