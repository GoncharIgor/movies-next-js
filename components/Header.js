import classes from './Header.module.scss';

export const Header = () => {
    return (
        <nav className={classes.header}>
            <img className={classes.logo}
                 src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg" alt="logo"/>
            <img className={classes.avatar}
                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                 alt="user"/>
        </nav>
    );
};
