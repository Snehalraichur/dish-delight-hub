import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function EmailVerification() {
  const [isResending, setIsResending] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    setIsResending(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    toast.success('Verification email sent!');
    setIsResending(false);
  };

  const handleCheckVerification = async () => {
    // Simulate verification check
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsVerified(true);
    toast.success('Email verified!');
    setTimeout(() => navigate('/feed'), 1500);
  };

  return (
    <div className="min-h-screen gradient-warm flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>

        <div className="bg-card rounded-3xl shadow-xl p-8 border border-border text-center">
          {!isVerified ? (
            <>
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 gradient-primary rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Mail className="w-10 h-10 text-primary-foreground" />
              </motion.div>

              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Check Your Email</h2>
              <p className="text-muted-foreground mb-6">
                We've sent a verification link to<br />
                <span className="font-medium text-foreground">john@example.com</span>
              </p>

              <div className="bg-muted/50 rounded-2xl p-4 mb-6">
                <p className="text-sm text-muted-foreground">
                  Click the link in the email to verify your account. If you don't see it, check your spam folder.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleCheckVerification}
                  variant="hero"
                  size="lg"
                  className="w-full h-12 rounded-xl"
                >
                  I've Verified My Email
                </Button>

                <Button
                  onClick={handleResend}
                  variant="outline"
                  size="lg"
                  className="w-full h-12 rounded-xl"
                  disabled={isResending}
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isResending ? 'animate-spin' : ''}`} />
                  {isResending ? 'Sending...' : 'Resend Email'}
                </Button>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="w-20 h-20 bg-fresh rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-2xl font-bold font-display text-foreground mb-2">Email Verified!</h2>
              <p className="text-muted-foreground">Redirecting you to the app...</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
