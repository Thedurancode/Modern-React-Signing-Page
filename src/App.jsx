import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faLock, faUser, faSignOutAlt, faBriefcase, faMapMarkerAlt, faEdit, faSave, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const mockUser = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  role: "Senior Software Engineer",
  location: "San Francisco, CA",
  avatar: "https://i.pravatar.cc/150?img=11",
  bio: "Passionate about building great software and solving complex problems. Love working with React and modern web technologies.",
  stats: {
    projects: 15,
    contributions: 847,
    followers: 231
  }
};

function ForgotPassword({ onNavigateToSignIn }) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would make an API call here to handle password reset
    console.log('Password reset requested for:', email);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="signin-box">
        <div className="logo">
          <svg width="80" height="80" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#7C3AED" strokeWidth="8"/>
            <path d="M30 50 L45 65 L70 35" stroke="#7C3AED" strokeWidth="8" fill="none"/>
          </svg>
        </div>
        
        <h1>Check Your Email</h1>
        <p className="subtitle">We've sent password reset instructions to your email</p>
        
        <button className="signin-button" onClick={onNavigateToSignIn}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="signin-box">
      <div className="logo">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#7C3AED" strokeWidth="8"/>
          <path d="M30 50 L45 65 L70 35" stroke="#7C3AED" strokeWidth="8" fill="none"/>
        </svg>
      </div>
      
      <h1>Reset Password</h1>
      <p className="subtitle">Enter your email to receive reset instructions</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Email address"
          />
        </div>

        <button type="submit" className="signin-button">
          Send Reset Instructions
        </button>
      </form>

      <p className="signup-link">
        Remember your password? <a href="#" onClick={onNavigateToSignIn}>Sign in</a>
      </p>
    </div>
  );
}

function Profile({ onSignOut }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(mockUser);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // In a real app, you would make an API call here
    Object.assign(mockUser, editedUser);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedUser(mockUser);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedUser(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="signin-box profile-box">
      <div className="profile-header">
        <img src={mockUser.avatar} alt="Profile" className="profile-avatar" />
        {!isEditing ? (
          <button className="edit-profile-button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faEdit} /> Edit Profile
          </button>
        ) : (
          <div className="edit-buttons">
            <button className="edit-profile-button save-button" onClick={handleSave}>
              <FontAwesomeIcon icon={faSave} /> Save
            </button>
            <button className="edit-profile-button cancel-button" onClick={handleCancel}>
              <FontAwesomeIcon icon={faTimes} /> Cancel
            </button>
          </div>
        )}
      </div>

      {!isEditing ? (
        <>
          <h1>{mockUser.name}</h1>
          <p className="subtitle">
            <FontAwesomeIcon icon={faBriefcase} className="profile-icon" /> {mockUser.role}
          </p>
          <p className="location">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="profile-icon" /> {mockUser.location}
          </p>
        </>
      ) : (
        <div className="edit-form">
          <div className="input-group">
            <FontAwesomeIcon icon={faUser} className="input-icon" />
            <input
              type="text"
              value={editedUser.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Full Name"
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faBriefcase} className="input-icon" />
            <input
              type="text"
              value={editedUser.role}
              onChange={(e) => handleChange('role', e.target.value)}
              placeholder="Role"
            />
          </div>
          <div className="input-group">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="input-icon" />
            <input
              type="text"
              value={editedUser.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="Location"
            />
          </div>
        </div>
      )}

      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">{mockUser.stats.projects}</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{mockUser.stats.contributions}</span>
          <span className="stat-label">Contributions</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{mockUser.stats.followers}</span>
          <span className="stat-label">Followers</span>
        </div>
      </div>

      <div className="profile-bio">
        <h3>About</h3>
        {!isEditing ? (
          <p>{mockUser.bio}</p>
        ) : (
          <textarea
            value={editedUser.bio}
            onChange={(e) => handleChange('bio', e.target.value)}
            className="bio-textarea"
            placeholder="Tell us about yourself"
          />
        )}
      </div>

      <div className="profile-contact">
        <div className="contact-item">
          <FontAwesomeIcon icon={faEnvelope} className="profile-icon" />
          <span>{mockUser.email}</span>
        </div>
      </div>

      <button className="signin-button signout-button" onClick={onSignOut}>
        <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
      </button>
    </div>
  );
}

function SignIn({ onNavigateToCreate, onSignIn, onNavigateToForgot }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign in submitted:', { email, password });
    onSignIn();
  };

  return (
    <div className="signin-box">
      <div className="logo">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#7C3AED" strokeWidth="8"/>
          <path d="M30 50 L45 65 L70 35" stroke="#7C3AED" strokeWidth="8" fill="none"/>
        </svg>
      </div>
      
      <h1>Welcome Back</h1>
      <p className="subtitle">Sign in to continue</p>

      <div className="social-buttons">
        <button className="social-button" type="button" aria-label="Sign in with Google">
          <FontAwesomeIcon icon={faGoogle} /> Google
        </button>
        <button className="social-button" type="button" aria-label="Sign in with GitHub">
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </button>
        <button className="social-button" type="button" aria-label="Sign in with LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </button>
      </div>

      <div className="divider">
        <span>or continue with email</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Email address"
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            aria-label="Password"
          />
        </div>

        <div className="form-footer">
          <label className="remember-me">
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" onClick={onNavigateToForgot} className="forgot-password">Forgot Password?</a>
        </div>

        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>

      <p className="signup-link">
        Don't have an account? <a href="#" onClick={onNavigateToCreate}>Sign up</a>
      </p>
    </div>
  );
}

function CreateAccount({ onNavigateToSignIn }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Create account submitted:', { name, email, password, confirmPassword });
    onNavigateToSignIn();
  };

  return (
    <div className="signin-box">
      <div className="logo">
        <svg width="80" height="80" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#7C3AED" strokeWidth="8"/>
          <path d="M30 50 L45 65 L70 35" stroke="#7C3AED" strokeWidth="8" fill="none"/>
        </svg>
      </div>
      
      <h1>Create Account</h1>
      <p className="subtitle">Sign up to get started</p>

      <div className="social-buttons">
        <button className="social-button" type="button" aria-label="Sign up with Google">
          <FontAwesomeIcon icon={faGoogle} /> Google
        </button>
        <button className="social-button" type="button" aria-label="Sign up with GitHub">
          <FontAwesomeIcon icon={faGithub} /> GitHub
        </button>
        <button className="social-button" type="button" aria-label="Sign up with LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
        </button>
      </div>

      <div className="divider">
        <span>or create an account with email</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <FontAwesomeIcon icon={faUser} className="input-icon" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="name"
            aria-label="Full name"
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faEnvelope} className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            aria-label="Email address"
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-label="Password"
          />
        </div>

        <div className="input-group">
          <FontAwesomeIcon icon={faLock} className="input-icon" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            autoComplete="new-password"
            aria-label="Confirm password"
          />
        </div>

        <button type="submit" className="signin-button">
          Create Account
        </button>
      </form>

      <p className="signup-link">
        Already have an account? <a href="#" onClick={onNavigateToSignIn}>Sign in</a>
      </p>
    </div>
  );
}

function App() {
  const [currentScreen, setCurrentScreen] = useState('signin');

  const handleSignIn = () => {
    setCurrentScreen('profile');
  };

  const handleSignOut = () => {
    setCurrentScreen('signin');
  };

  return (
    <div className="container">
      {currentScreen === 'signin' && (
        <SignIn 
          onNavigateToCreate={() => setCurrentScreen('create')}
          onNavigateToForgot={() => setCurrentScreen('forgot')}
          onSignIn={handleSignIn}
        />
      )}
      {currentScreen === 'create' && (
        <CreateAccount onNavigateToSignIn={() => setCurrentScreen('signin')} />
      )}
      {currentScreen === 'forgot' && (
        <ForgotPassword onNavigateToSignIn={() => setCurrentScreen('signin')} />
      )}
      {currentScreen === 'profile' && (
        <Profile onSignOut={handleSignOut} />
      )}
    </div>
  );
}

export default App;
