import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import NoteListItem from './NoteListItem';

if(Meteor.isClient) {
    describe('NoteListItem', function() {
        it('should render title and timestamp', function() {
            const title = 'My title here';
            const updatedAt = 1563134096143;
            const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>);

            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('7/14/19');
        });

        it('should set default title if not title set', function() {
            const updatedAt = 1563134096143;
            const wrapper = mount(<NoteListItem note={{updatedAt}}/>);
            expect(wrapper.find('h5').text()).toBe('Untitled Note');
        })
    });

}