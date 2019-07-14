import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';
import { Meteor } from 'meteor/meteor';

import { NoteListItem } from './NoteListItem';
import { notes } from '../fixtures/fixtures';

if(Meteor.isClient) {
    describe('NoteListItem', function() {
        let Session;

        beforeEach(()=>{
            Session = {
                set: expect.createSpy()
            };
        });

        it('should render title and timestamp', function() {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);

            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect(wrapper.find('p').text()).toBe('7/14/19');
        });

        it('should set default title if not title set', function() {
            const wrapper = mount(<NoteListItem note={notes[1]} Session={Session}/>);
            expect(wrapper.find('h5').text()).toBe('Untitled Note');
        });

        it('should call set on click', function() {
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        });
    });

}